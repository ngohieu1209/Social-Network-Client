import { UploadInformation } from "./upload";

export interface UserInformation {
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

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  avatar?: null | string;
}

interface SocialLinks {
  id: string,
  linkFacebook: string,
  linkInstagram: string,
  linkGithub: string,
}