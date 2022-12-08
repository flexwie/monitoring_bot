import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, TgtgCredentials } from '@prisma/client';
import {
  createCipheriv,
  randomBytes,
  createHash,
  createDecipheriv,
  scrypt,
} from 'crypto';
import { promisify } from 'util';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private iv = randomBytes(16);
  private config: ConfigService;
  private logger = new Logger(PrismaService.name);

  constructor(public configService: ConfigService) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
      ],
    });

    this.config = configService;

    // sanity check
    this.config.getOrThrow('DB_SECRET');

    // encrypt passwords and secrets on create/update
    this.$use(async (params, next) => {
      if (
        params.model == 'TgtgCredentials' &&
        ['create', 'createMany', 'update', 'updateMany', 'upsert'].includes(
          params.action,
        )
      ) {
        // encypt access token
        (params.args.data as TgtgCredentials).access_token =
          await this.encryptData(params.args.data.access_token);
        // encrypt refresh token
        (params.args.data as TgtgCredentials).refresh_token =
          await this.encryptData(params.args.data.refresh_token);
      }

      const result = await next(params);
      return result;
    });

    // decrypt passwords and secrets on read
    this.$use(async (params, next) => {
      if (
        params.model == 'TgtgCredentials' &&
        params.action.startsWith('find')
      ) {
        const result = await next(params);
        if (result && result.access_token && result.refresh_token) {
          if (Array.isArray(result)) {
            return await Promise.all(
              result.map(async (v: TgtgCredentials) => ({
                ...v,
                access_token: await this.decryptData(v.access_token),
                refresh_token: await this.decryptData(v.refresh_token),
              })),
            );
          } else {
            return {
              ...result,
              access_token: await this.decryptData(result.access_token),
              refresh_token: await this.decryptData(result.refresh_token),
            };
          }
        }

        return result;
      }

      const result = await next(params);
      return result;
    });

    //setup logging
    (this as any).$on('query', (e) => {
      this.logger.debug(`[${e.duration}ms] ${e.query}`);
    });

    (this as any).$on('error', (e) => {
      this.logger.error(e);
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to database');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
      this.logger.log('Closing database connection');
    });
  }

  public async encryptData(data: string): Promise<string> {
    const secret = this.config.getOrThrow('DB_SECRET');
    const key = (await promisify(scrypt)(secret, 'salt', 24)) as Buffer;

    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-192-cbc' as any, key, iv);

    return (
      iv.toString('hex') +
      '/' +
      cipher.update(data, 'utf8', 'hex') +
      cipher.final('hex')
    );
  }

  public async decryptData(crypt: string): Promise<string> {
    const secret = this.config.getOrThrow('DB_SECRET');
    const key = (await promisify(scrypt)(secret, 'salt', 24)) as Buffer;

    const iv = Buffer.from(crypt.split('/')[0], 'hex');
    const encrypted = crypt.split('/')[1];
    const decipher = createDecipheriv('aes-192-cbc' as any, key, iv);

    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  }
}
