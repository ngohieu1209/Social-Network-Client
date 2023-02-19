import { AddCommentDto, DeleteCommentDto, EditCommentDto } from "./comment";

export interface ServerToClientEvents {
  "onNewComment": (data: any) => void;
  "onEditComment": (data: any) => void;
  "onDeleteComment": (data: any) => void;
  "onNewNotification": (data: any) => void;
  "onSeenNotification": (data: any) => void;
  "onPostNotFound": (data: any) => void;
}

export interface ClientToServerEvents {
  'Comment:NewComment': (data: AddCommentDto) => void;
  'Comment:EditComment': (data: EditCommentDto) => void;
  'Comment:DeleteComment': (data: DeleteCommentDto) => void;
  'Notification:SeenNotification': (id: string) => void;
}

export type onDataToServer<T> = {
  ACTION: string;
  PAYLOAD: T;
}