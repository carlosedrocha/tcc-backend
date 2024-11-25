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
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        id: true,
        status: true,
        tab: {
          // Inclui as informações da Tab
          select: {
            id: true,
            tabNumber: true,
            total: true,
            status: true,
          },
        },
        dishesOrder: {
          select: {
            dish: {
              select: {
                name: true,
              },
            },
            createdAt: true,
          },
        },
      },
    });
  }
}
