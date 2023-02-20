import io, { Socket } from 'socket.io-client';
import {
  AddCommentDto,
  DeleteCommentDto,
  EditCommentDto,
} from '../../models/comment';
import {
  ClientToServerEvents,
  onDataToServer,
  ServerToClientEvents,
} from '../../models/events';
import { CommentHandler, NotificationHandler } from './handler';

class SocketService {
  private readonly socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io('http://localhost:5000', {
      autoConnect: false,
    });
  connectWithSocketServer(userId: string) {
    this.socket.auth = { id: userId };
    this.socket.connect();

    this.socket.on('onNewComment', (data: onDataToServer<any>) => {
      CommentHandler.updateComment(data);
    });

    this.socket.on('onEditComment', (data: onDataToServer<any>) => {
      CommentHandler.editComment(data);
    });
    this.socket.on('onDeleteComment', (data: onDataToServer<any>) => {
      CommentHandler.deleteComment(data);
    });
    this.socket.on('onNewNotification', (data: onDataToServer<any>) => {
      NotificationHandler.updateNotification(data);
    });
    this.socket.on('onSeenNotification', (data: onDataToServer<any>) => {
      NotificationHandler.seenNotification(data);
    });
    this.socket.on('onPostNotFound', (data: onDataToServer<any>) => {
      CommentHandler.postNotFound(data);
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendComment(data: AddCommentDto) {
    this.socket.emit('Comment:NewComment', data);
  }

  sendEditComment(data: EditCommentDto) {
    this.socket.emit('Comment:EditComment', data);
  }

  sendDeleteComment(data: DeleteCommentDto) {
    this.socket.emit('Comment:DeleteComment', data);
  }

  sendSeenNotification(id: string) {
    this.socket.emit('Notification:SeenNotification', id);
  }

  postNotFound(notificationHandler: ServerToClientEvents['onPostNotFound']) {
    this.socket.on('onPostNotFound', notificationHandler);
  }
}

export const socketService = new SocketService();
