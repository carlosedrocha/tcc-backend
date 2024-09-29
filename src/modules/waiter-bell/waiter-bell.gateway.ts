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
import { TabService } from '../tab/tab.service';
import { Tab } from '@prisma/client';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Permitir qualquer origem (ajuste conforme necessário)
    },
  })
  @UseGuards(AccessTokenGuard)
  export class WaiterBellGateway{
    @WebSocketServer()
    server: Server;
  // Injeção de dependência de TabService no construtor
  constructor(private readonly tabService: TabService) {}
    // constructor(tabService:TabService){}
    // Método que será chamado quando o cliente apertar a campainha
    @SubscribeMessage('callWaiter')
   async handleCallWaiter(
      @MessageBody() data: { tabId: string },
      @ConnectedSocket() client: Socket,
    ) {
      const dataString = JSON.stringify(data).replace(/"/g, '');
       const tab:Tab = await this.tabService.getTabBellById(dataString);
       console.log(tab)
       console.log(tab.id+" | "+tab.status)
      this.server.emit('Cliente:', "");
    }
  }