import { UploadInformation } from "./upload";

export interface UserInformation {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatar: UploadInformation | null;
  followers: number;
  following: number;
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  avatar?: null | string;
}
