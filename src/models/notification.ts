import { UserInformation } from "./user";

export interface INotification {
  id: string;
  recipient: string;
  sender: Pick<UserInformation, 'id' | 'firstName' | 'lastName' | 'avatar'>;
  postId: string;
  action: string;
  seen: number;
  createdAt: Date;
  updatedAt: Date;
}