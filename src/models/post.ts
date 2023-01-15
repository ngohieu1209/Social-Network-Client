import { UserInformation } from "./user";

export interface PostInformation {
  id: string;
  content: string;
  postMode: string;
  createdAt: string;
  updatedAt: string;
  user: Partial<UserInformation>;
}