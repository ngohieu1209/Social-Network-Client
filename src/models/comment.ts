import { UserInformation } from "./user";

export interface IComment {
  id: string;
  userId: Partial<UserInformation>;
  postId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddCommentDto {
  postId: string;
  content: string;
  userId: string;
}

export interface EditCommentDto {
  id: string;
  postId: string;
  content: string;
}

export interface DeleteCommentDto {
  id: string;
  postId: string;
}
