import io, { Socket } from 'socket.io-client';
import { AddCommentDto, DeleteCommentDto, EditCommentDto } from '../../models/comment';
import { ClientToServerEvents, ServerToClientEvents } from '../../models/events';

class SocketService {
  private readonly socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io('http://localhost:5000', {
      autoConnect: false,
    });
  
  connectWithSocketServer(userId: string) {
    this.socket.auth = { id: userId };
    this.socket.connect();
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

  updateComment(commentHandler: ServerToClientEvents['onNewComment']) {
    this.socket.on('onNewComment', commentHandler);
  }

  editComment(commentHandler: ServerToClientEvents['onEditComment']) {
    this.socket.on('onEditComment', commentHandler);
  }

  deleteComment(commentHandler: ServerToClientEvents['onDeleteComment']) {
    this.socket.on('onDeleteComment', commentHandler);
  }

  updateNotification(notificationHandler: ServerToClientEvents['onNewNotification']) {
    this.socket.on('onNewNotification', notificationHandler);
  }

  seenNotification(notificationHandler: ServerToClientEvents['onSeenNotification']) {
    this.socket.on('onSeenNotification', notificationHandler);
  }
}

export const socketService = new SocketService();