import { Profile } from "../profile/profile";

export interface IWallet {
  getProfile(account: string): Promise<Profile | null>;
}
