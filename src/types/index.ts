export type Profile = {
  accountId: string;
  name: string;
  bio: string;
  links: ProfileLinks;
};

export type ProfileLinks = {
  twitter: string;
  github: string;
  telegram: string;
};
