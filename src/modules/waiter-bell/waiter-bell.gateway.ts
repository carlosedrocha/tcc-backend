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
    const tab: Tab = await this.tabService.getTabBellById(data.tabId);
    
    // Log para verificar se os dados foram retornados corretamente
    console.log('Tab Data:', tab);

    // Emitir um evento específico para a interface do garçom
    this.server.emit('waiterNotification', {
      tabId: tab.id,
      status: tab.status,
      message: `Pedido da mesa ${tab.id}: Status ${tab.status}`,
    });
  }
}
