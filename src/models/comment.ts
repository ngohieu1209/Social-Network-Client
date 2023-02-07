import { PostInformation } from './post';
import { UserInformation } from "./user";

export interface IComment {
  id: string;
  userId: Partial<UserInformation>;
  postId: Partial<PostInformation>;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddCommentDto {
  postId: string;
  content: string;
  userId: string;
}