import { Wallet } from "@mui/icons-material";
import { Contract, Near, WalletConnection } from "near-api-js";
import { IWallet } from "..";
import { NearMetadata } from "../../../types";
import { Profile } from "../../profile/profile";

export const HUB_OPTIONS = {
  changeMethods: [],
  viewMethods: ["get_soulbound_id_for_account"],
};

const SBT_OPTIONS = {
  changeMethods: [],
  viewMethods: ["get_metadata"],
};

export class NearWallet implements IWallet {
  readonly connection: WalletConnection;
  readonly contract: Contract;

  constructor(connection: WalletConnection, contract: Contract) {
    this.connection = connection;
    this.contract = contract;
  }

  async getProfile(accountId?: string): Promise<Profile | null> {
    const account = accountId ?? this.connection.getAccountId();

    let sbtId: string;

    try {
      sbtId = await (this.contract as any).get_soulbound_id_for_account({
        account_id: account,
      });
    } catch (err) {
      console.log(err);
      return null;
    }

    const sbt = new Contract(this.connection.account(), sbtId, SBT_OPTIONS);
    const metadata: NearMetadata = await (sbt as any).get_metadata();

    return await Profile.fromNearMetadata(account, metadata);
  }
}
