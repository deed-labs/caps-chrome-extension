import { useEffect, useState } from "react";
import { Profile } from "../lib/profile/profile";
import { IWallet } from "../lib/wallet";

export const useProfiles = (
  wallet: IWallet,
  accounts: string[]
): Profile[] | null => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);

  useEffect(() => {
    if (!accounts || accounts.length === 0) return;

    let list: Profile[] = [];
    accounts.forEach((acc) => {
      wallet.getProfile(acc).then((profile) => {
        if (profile) list.push(profile);
      });
    });

    setProfiles(list);
  }, []);

  return profiles;
};
