import { UseGuards } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
import { AccessTokenGuard } from 'src/common/guards';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Permitir qualquer origem (ajuste conforme necessário)
    },
  })
  @UseGuards(AccessTokenGuard)
  export class WaiterBellGateway{
    @WebSocketServer()
    server: Server;
  
    // Método que será chamado quando o cliente apertar a campainha
    @SubscribeMessage('callWaiter')
   async handleCallWaiter(
      @MessageBody() data: { tableNumber: number },
      @ConnectedSocket() client: Socket,
    ) {
      // Aqui você pode emitir o evento para o garçom com a mesa que chamou
      this.server.emit('waiterCalled', data);
    }
  }