import { User as _User } from './user';
import { Subscription as _Subscription } from './subscription';
import { TgtgCredentials as _TgtgCredentials } from './tgtg_credentials';
import { Usage as _Usage } from './usage';

export namespace PrismaModel {
  export class User extends _User {}
  export class Subscription extends _Subscription {}
  export class TgtgCredentials extends _TgtgCredentials {}
  export class Usage extends _Usage {}

  export const extraModels = [User, Subscription, TgtgCredentials, Usage];
}
