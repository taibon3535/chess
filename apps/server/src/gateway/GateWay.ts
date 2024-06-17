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

type Game = {
  roomId: string;
  fen: string;
};

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200'],
  },
})
export class MyGateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  games: Game[] = [];

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
    @MessageBody() body: { roomId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const foundGame = this.games.find((game) => game.roomId === body.roomId);
    if (!foundGame) {
      this.games.push({
        roomId: body.roomId,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      });
    }
    socket.join(body.roomId);

    console.log(this.games);
  }

  @SubscribeMessage('newMove')
  onNewMove(@MessageBody() body: Game) {
    const foundGame = this.games.findIndex(
      (game) => game.roomId === body.roomId,
    );

    this.games[foundGame] = { ...this.games[foundGame], fen: body.fen };

    console.log(this.games);

    this.server.in(body.roomId).emit('newMove', {
      fen: body.fen,
    });
  }
}
