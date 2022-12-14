import { ExternalLinks, NearMetadata, ProfileInfo } from "../../types";

export class Profile {
  public account: string;
  public name: string;
  public imageUrl: string;
  public symbol: string;
  public bio: string;
  public links: ExternalLinks;

  constructor(
    account: string,
    name: string,
    imageUrl: string,
    symbol: string,
    bio: string,
    links: ExternalLinks
  ) {
    this.account = account;
    this.name = name;
    this.imageUrl = imageUrl;
    this.symbol = symbol;
    this.bio = bio;
    this.links = links;
  }

  static async fromNearMetadata(
    account: string,
    metadata: NearMetadata
  ): Promise<Profile> {
    let info: ProfileInfo = {} as ProfileInfo;

    if (metadata.reference !== "") {
      const resp = await fetch(metadata.reference, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      info = await resp.json();
    }

    return new Profile(
      account,
      metadata.name,
      info.image,
      metadata.symbol,
      info.bio,
      info.links
    );
  }
}
