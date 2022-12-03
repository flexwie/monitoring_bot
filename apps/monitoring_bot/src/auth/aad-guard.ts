import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor(config: ConfigService) {
    const clientId = config.getOrThrow('AAD_CLIENT_ID');
    const tenantId = config.getOrThrow('AAD_TENANT_ID');

    super({
      identityMetadata: `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration`,
      clientID: clientId,
    });
  }

  async validate(data) {
    return data;
  }
}

export const AzureADGuard = AuthGuard('azure-ad');
