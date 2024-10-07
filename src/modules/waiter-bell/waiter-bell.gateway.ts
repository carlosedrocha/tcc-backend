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
import { Entity, Tab } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: '*', // Permitir qualquer origem
  },
})
@UseGuards(AccessTokenGuard)
export class WaiterBellGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly tabService: TabService) {}

  // Método que será chamado quando o cliente apertar a campainha
  @SubscribeMessage('callWaiter')
  async handleCallWaiter(
    @MessageBody() data: { tabId: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Obtenha informações do Tab                                                                               
    const dataString = JSON.stringify(data).replace(/"/g, '');
    const tab: Tab = await this.tabService.getTabBellById(dataString);
    const entity:Entity = await this.tabService.getEntityById(tab.entityId)
    const message = entity !== undefined ? `Pedido da mesa ${tab.tabNumber} | cliente: ${entity.firstName}`: `Pedido da mesa ${tab.tabNumber} `
    // Emitir um evento específico para a interface do garçom
    this.server.emit('waiterNotification', message);
    
  }
}
