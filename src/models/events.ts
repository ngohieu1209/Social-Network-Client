import { AddCommentDto, DeleteCommentDto, EditCommentDto } from "./comment";

export interface ServerToClientEvents {
  "onNewComment": (data: any) => void;
  "onEditComment": (data: any) => void;
  "onDeleteComment": (data: any) => void;
}

export interface ClientToServerEvents {
  "Comment:NewComment": (data: AddCommentDto) => void;
  "Comment:EditComment": (data: EditCommentDto) => void;
  "Comment:DeleteComment": (data: DeleteCommentDto) => void;
}
