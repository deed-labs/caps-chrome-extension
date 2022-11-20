import { useEffect, useState } from "react";
import { Profile } from "../lib/profile/profile";
import { IWallet } from "../lib/wallet";

export const useProfiles = (wallet: IWallet, accounts: string[]): Profile[] => {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      let list: Profile[] = [];
      for (let i = 0; i < accounts.length; i++) {
        const profile = await wallet.getProfile(accounts[i]);
        if (profile) list.push(profile);
      }

      setProfiles(list);
    };

    fetchProfiles();
  }, [accounts]);

  return profiles;
};
