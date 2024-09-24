import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOrderStatusDto } from './dto/kanban/update-order-statu.dto';

@Injectable()
export class KanbanService {
    constructor(private prisma: PrismaService) {}

  // Atualiza o status de um pedido
  async updateStatus(updateOrderStatusDto: UpdateOrderStatusDto) {
    const { orderId, status } = updateOrderStatusDto;

    // Verifica se o pedido existe
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Comanda não encontrada.`);
    }

    // Atualiza o status do pedido
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  // Pega todos os pedidos (útil para visualizar no Kanban)
  async getAllOrders() {
    return this.prisma.order.findMany({
      select: {
        id: true,
        status: true,
        dishesOrder: {
          select: {
            dish: {
              select: {
                name: true, // Seleciona apenas o nome do prato
              },
            },
          },
        },
      },
    });
  }
  
  
}
