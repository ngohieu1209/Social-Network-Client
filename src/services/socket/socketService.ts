import io, { Socket } from 'socket.io-client';
import { AddCommentDto } from '../../models/comment';
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

  updateComment(commentHandler: ServerToClientEvents['onNewComment'] | null) {
    if(commentHandler)
      this.socket.on('onNewComment', commentHandler);
  }
}

export const socketService = new SocketService();