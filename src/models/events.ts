import { AddCommentDto } from "./comment";

export interface ServerToClientEvents {
  "onNewComment": (data: any) => void;
}

export interface ClientToServerEvents {
  "Comment:NewComment": (data: AddCommentDto) => void;
}
