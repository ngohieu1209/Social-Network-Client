import { UserInformation } from './user';
export type Friend = {
  id: string;
  user_send_request: Partial<UserInformation>;
  user_receive_request: Partial<UserInformation>;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
