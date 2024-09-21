import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOrderDto } from './dto';
import { CreateOrderDto } from './dto/order/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders() {
    try {
      const orders = await this.prisma.order.findMany({
        include: {
          itemsOrder: {
            include: {
              item: true,
            },
          },
          dishesOrder: {
            include: {
              dish: true,
            },
          },
        },
      });

      return orders;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar pedidos');
    }
  }

  async getOrderById(id: string) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id,
        },
        include: {
          itemsOrder: {
            include: {
              item: true,
            },
          },
          dishesOrder: {
            include: {
              dish: true,
            },
          },
        },
      });

      if (!order) {
        throw new NotFoundException('Pedido não encontrado');
      }

      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao buscar pedido');
    }
  }

  async createOrder(dto: CreateOrderDto) {
    try {
      if (dto.dishes) {
        const checkDishes = await this.prisma.dish.findMany({
          where: {
            deletedAt: null,
            id: {
              in: dto.dishes.map((dish) => dish.id),
            },
          },
        });
        

        if (checkDishes.length !== dto.dishes.length) {
          throw new NotFoundException('Algum prato não encontrado');
        }
      }

      if (dto.items) {
        const checkItems = await this.prisma.item.findMany({
          where: {
            deletedAt: null,
            id: {
              in: dto.items.map((item) => item.id),
            },
          },
        });

        if (checkItems.length !== dto.items.length) {
          throw new NotFoundException('Algum item não encontrado');
        }
      }
      
      const checkTab = await this.prisma.tab.findUnique({
        where: {
          id: dto.tabId,
        },
      });

      if (!checkTab) {
        throw new NotFoundException('Mesa não encontrada');
      }

      if (checkTab.closedAt) {
        throw new BadRequestException('Comanda/Conta fechada');
      }

      const order = await this.prisma.order.create({
        data: {
          tab: {
            connect: {
              id: dto.tabId,
            },
          },
          ...(dto.items && {
            itemsOrder: {
              create: dto.items.map((item) => ({
                item: {
                  connect: {
                    id: item.id,
                  },
                },
                quantity: item.quantity,
              })),
            },
          }),
          ...(dto.dishes && {
            dishesOrder: {
              create: dto.dishes.map((dish) => ({
                dish: {
                  connect: {
                    id: dish.id,
                  },
                },
                quantity: dish.quantity,
              })),
            },
          }),
          status:dto.status
        },
      });

      return order;
    } catch (error) {
      console.log(dto);
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao criar pedido');
    }
  }

  async updateOrder(orderId: string, dto: UpdateOrderDto) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
        include: {
          itemsOrder: true,
          dishesOrder: true,
        },
      });

      if (!order) {
        throw new NotFoundException('Pedido não encontrado');
      }

      if (dto.dishes) {
        const checkDishes = await this.prisma.dish.findMany({
          where: {
            deletedAt: null,
            id: { in: dto.dishes.map((dish) => dish.id) },
          },
        });

        if (checkDishes.length !== dto.dishes.length) {
          throw new NotFoundException('Algum prato não encontrado');
        }

        await this.handleDishesOrderUpdate(order.id, dto.dishes);
      }

      if (dto.items) {
        const checkItems = await this.prisma.item.findMany({
          where: {
            deletedAt: null,
            id: { in: dto.items.map((item) => item.id) },
          },
        });

        if (checkItems.length !== dto.items.length) {
          throw new NotFoundException('Algum item não encontrado');
        }

        await this.handleItemsOrderUpdate(order.id, dto.items);
      }

      return await this.prisma.order.findUnique({
        where: { id: orderId },
        include: {
          itemsOrder: true,
          dishesOrder: true,
        },
      });
    } catch (error) {
      console.log(dto);
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao atualizar pedido');
    }
  }

  private async handleDishesOrderUpdate(orderId: string, dishes: any[]) {
    for (const dish of dishes) {
      if (dish.quantity === 0) {
        await this.prisma.dishOrder.updateMany({
          where: { orderId, dishId: dish.id },
          data: { deletedAt: new Date() },
        });
      } else {
        const existingDishOrder = await this.prisma.dishOrder.findUnique({
          where: { orderId_dishId: { orderId, dishId: dish.id } },
        });

        if (existingDishOrder) {
          await this.prisma.dishOrder.update({
            where: { id: existingDishOrder.id },
            data: { quantity: dish.quantity },
          });
        } else {
          await this.prisma.dishOrder.create({
            data: {
              orderId,
              dishId: dish.id,
              quantity: dish.quantity,
            },
          });
        }
      }
    }
  }

  private async handleItemsOrderUpdate(orderId: string, items: any[]) {
    for (const item of items) {
      if (item.quantity === 0) {
        await this.prisma.itemOrder.updateMany({
          where: { orderId, itemId: item.id },
          data: { deletedAt: new Date() },
        });
      } else {
        const existingItemOrder = await this.prisma.itemOrder.findUnique({
          where: { orderId_itemId: { orderId, itemId: item.id } },
        });

        if (existingItemOrder) {
          await this.prisma.itemOrder.update({
            where: { id: existingItemOrder.id },
            data: { quantity: item.quantity },
          });
        } else {
          await this.prisma.itemOrder.create({
            data: {
              orderId,
              itemId: item.id,
              quantity: item.quantity,
            },
          });
        }
      }
    }
  }
}
