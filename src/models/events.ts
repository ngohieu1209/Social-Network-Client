import { AddCommentDto, IComment } from "./comment";

export interface ServerToClientEvents {
  "onNewComment": (data: IComment) => void;
}

export interface ClientToServerEvents {
  "Comment:NewComment": (data: AddCommentDto) => void;
}
