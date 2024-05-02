import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Move } from 'chess.js';

import { Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200'],
  },
})
export class MyGateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(
    @MessageBody() body: any,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(body);
    socket.to(body).emit('joinRoom', {
      msg: `${socket.id} join room ${body}`,
      content: body,
    });
  }

  @SubscribeMessage('newMove')
  onNewMove(@MessageBody() body: { room: string; result: Move }) {
    this.server.in(body.room).emit('newMove', {
      room: body.room,
      result: body.result,
    });
  }
}
