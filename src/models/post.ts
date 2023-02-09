import { IComment } from './comment';
import { UserInformation } from "./user";

export interface PostInformation {
  id: string;
  content: string;
  postMode: string;
  commentsCount: number;
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: Partial<UserInformation>;
  upload: Upload[] | [];
  comment: IComment[] | [];
}

interface Upload {
  id: string;
  public_id: string;
  name: string | null;
  file: string;
  fileType: string;
  url: string;
  postId: string | null;
  createdAt: Date;
  updatedAt: Date;
}