import { Body, Controller, Get, Patch, Put } from '@nestjs/common';
import { UpdateOrderStatusDto } from './dto';
import { KanbanService } from './kanban.service';

@Controller('kanban')
export class KanbanController {
    constructor(private readonly kanbanService: KanbanService) {}

    // Rota para atualizar o status de um pedido
    @Put()
    updateOrderStatus(@Body() updateOrderStatusDto: UpdateOrderStatusDto) {
      return this.kanbanService.updateStatus(updateOrderStatusDto);
    }
  
    // Rota para pegar todos os pedidos
    @Get()
    getAllOrders() {
      return this.kanbanService.getAllOrders();
    }
}
