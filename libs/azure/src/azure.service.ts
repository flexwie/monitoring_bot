import { Injectable, Scope } from '@nestjs/common';
import { InteractiveBrowserCredential } from '@azure/identity';
import { ApplicationInsightsManagementClient } from '@azure/arm-appinsights';

@Injectable({
  scope: Scope.REQUEST,
})
export class AzureService {
  async acquireToken(subscriptionId: string): Promise<string> {
    const credentials = new InteractiveBrowserCredential({
      redirectUri: 'http://localhost:1337',
    });
    // const client = new ApplicationInsightsManagementClient(
    //   credentials,
    //   subscriptionId,
    // );

    // return client.
    await credentials.authenticate('profile');
    return await (
      await credentials.getToken('profile')
    ).token;
  }
}
