import { useEffect, useState } from "react";
import { Profile } from "../lib/profile/profile";
import { IWallet } from "../lib/wallet";

export const useProfile = (
  wallet: IWallet,
  accounts: string | undefined
): Profile | null => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!accounts || accounts === "") return;

    wallet.getProfile(accounts).then((profile) => {
      setProfile(profile);
    });
  }, []);

  return profile;
};
