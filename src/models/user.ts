import { UploadInformation } from "./upload";

export type UserInformation = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatar: Partial<UploadInformation> | null;
  location: string | null;
  bio: string | null;
  followers: number;
  following: number;
  links: Partial<SocialLinks> | null;
}

export type UpdateUser = {
  firstName?: string;
  lastName?: string;
  location?: null | string;
  bio?: null | string;
  avatar?: null | string;
}

export type SocialLinks = {
  id: string,
  linkFacebook: string | null,
  linkInstagram: string | null,
  linkGithub: string | null,
}