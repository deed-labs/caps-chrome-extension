import { Contract } from "near-api-js";
import { useEffect, useState } from "react";
import { Profile } from "../lib/profile/profile";
import { IWallet } from "../lib/wallet";

export const useProfile = (
  wallet: IWallet,
  address: string | undefined
): Profile | null => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!address || address === "") return;

    wallet.getProfile(address).then((profile) => {
      setProfile(profile);
    });
  });

  return profile;
};
