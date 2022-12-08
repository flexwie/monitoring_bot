import got from 'got';
import {
  EmailAuthResponse,
  PollingAuthResponse,
  BucketResponse,
  RefreshResponse,
  ITooGoodToGoService as ITgtgService,
} from './type';
import { sleep } from './util';
import moment from 'moment';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class TooGoodToGoService implements ITgtgService {
  logger = new Logger(TooGoodToGoService.name);

  pollingDelay = 5000;

  constructor(public client: PrismaService) {}

  private async getClient(chat_id: number, from_login = false) {
    const creds = await this.client.tgtgCredentials.findUnique({
      where: { chat_id },
    });

    if (!creds && !from_login)
      throw new CredentialsNotFound('Credentials not found (getClient)');

    return got.extend({
      prefixUrl: 'https://apptoogoodtogo.com/api/',
      headers: {
        'User-Agent':
          'TooGoodToGo/22.10.0 (4665) (iPhone/iPhone XS Max; iOS 16.0.2; Scale/3.00/iOS)',
        'Accept-Language': 'en-GB',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
      },
      hooks: {
        beforeRequest: [
          async (options) => {
            if (
              creds &&
              creds.last_login &&
              (options.url as any).pathname != '/api/auth/v3/token/refresh'
            ) {
              // https://momentjs.com/docs/#/manipulating/
              // Moments are mutable. Perform a copy to leave intact the original lastLogin.
              const lastLogin = moment(creds.last_login);
              const expiry = lastLogin.add(creds.ttl, 's');

              if (moment().isAfter(expiry)) {
                const res = await this.refresh(chat_id);
                if (res) {
                  await this.client.tgtgCredentials.update({
                    where: { id: creds.id },
                    data: {
                      refresh_token: res.refreshToken,
                      access_token: res.accessToken,
                      last_login: res.lastLogin.toDate(),
                      ttl: res.accessTokenTTL,
                    },
                  });
                }
              }
            }

            if (creds && creds.access_token) {
              options.headers.Authorization = `Bearer ${creds.access_token}`;
            }
          },
        ],
      },
    });
  }

  async login(email: string, chat_id: number) {
    const client = await this.getClient(chat_id, true);
    this.logger.log(`Logging in with email ${email}.`);

    const response = await client.post('auth/v3/authByEmail', {
      responseType: 'json',
      json: {
        email: email,
        device_type: 'IOS',
      },
    });
    const data = response.body as EmailAuthResponse;

    while (true) {
      const res = await this.polling(email, data.polling_id, chat_id);
      if (res && res.accessToken) {
        this.logger.log(`Successfully logged in.`);

        await this.client.tgtgCredentials.create({
          data: {
            access_token: res.accessToken,
            refresh_token: res.refreshToken,
            last_login: res.lastLogin.toDate(),
            chat_id: chat_id,
            ttl: res.accessTokenTTL,
            tgtg_user_id: res.user.user_id,
          },
        });
        break;
      }
      this.logger.debug(`Sleeping ${this.pollingDelay} ms.`);
      await sleep(this.pollingDelay);
    }
  }

  async polling(email: string, pollingId: string, chat_id: number) {
    const client = await this.getClient(chat_id, true);
    this.logger.log(`Polling ${pollingId}.`);
    const response = await client.post('auth/v3/authByRequestPollingId', {
      responseType: 'json',
      json: {
        email: email,
        device_type: 'IOS',
        request_polling_id: pollingId,
      },
    });
    if (response.statusCode == 202) {
      this.logger.log(`The link wasn't opened.`);
    } else if (response.statusCode == 200) {
      const data = response.body as PollingAuthResponse;

      // save this to cache

      return {
        accessToken: data.access_token,
        accessTokenTTL: data.access_token_ttl_seconds,
        refreshToken: data.refresh_token,
        user: data.startup_data.user,
        lastLogin: moment(),
      };

      // this.accessToken = data.access_token;
      // this.accessTokenTTL = data.access_token_ttl_seconds;
      // this.refreshToken = data.refresh_token;
      // this.lastLogin = moment();
      // this.user = data.startup_data.user;
    }
  }

  async refresh(chat_id: number) {
    this.logger.log(`Refreshing token.`);
    const client = await this.getClient(chat_id);
    const creds = await this.client.tgtgCredentials.findUniqueOrThrow({
      where: { chat_id },
    });

    const lastLogin = moment(creds.last_login);
    const expiry = lastLogin.add(creds.ttl, 's');

    if (moment().isAfter(expiry)) {
      const response = await client.post('auth/v3/token/refresh', {
        responseType: 'json',
        json: {
          refresh_token: creds.refresh_token,
        },
      });

      const data = response.body as RefreshResponse;
      return {
        accessToken: data.access_token,
        accessTokenTTL: data.access_token_ttl_seconds,
        refreshToken: data.refresh_token,
        lastLogin: moment(),
      };
    }
  }

  async getFavorites(chat_id: number) {
    const client = await this.getClient(chat_id);
    const creds = await this.client.tgtgCredentials.findUniqueOrThrow({
      where: { chat_id },
    });

    const response = await client.post('discover/v1/bucket', {
      responseType: 'json',
      json: {
        paging: {
          size: 50,
          page: 0,
        },
        user_id: creds.tgtg_user_id,
        bucket: {
          filler_type: 'Favorites',
        },
        origin: {
          longitude: 0,
          latitude: 0,
        },
        radius: 90,
      },
    });

    const data = response.body as BucketResponse;

    return data.mobile_bucket.items;
  }
}

export class CredentialsNotFound extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = 'UserExistsError'; // (2)
  }
}
