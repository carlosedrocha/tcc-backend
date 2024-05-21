import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/order/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders() {
    try {
      const orders = await this.prisma.order.findMany({
        include: {
          items: true,
          dishs: true,
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
          items: true,
          dishs: true,
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

      //todo check if it is including the same dish if quantity > 1
      //todo refactor into one function
      const dishConnectIds: string[] = [];
      const buildDisheConnectIds = dto.dishes.map((dish) => {
        if (parseInt(dish.quantity) > 1) {
          dishConnectIds.push(dish.id);
        }

        return dishConnectIds.push(dish.id);
      });

      const itemConnectIds: string[] = [];
      const buildItemsConnectIds = dto.items.map((item) => {
        if (parseInt(item.quantity) > 1) {
          itemConnectIds.push(item.id);
        }

        return itemConnectIds.push(item.id);
      });

      const order = await this.prisma.order.create({
        data: {
          tab: {
            connect: {
              id: dto.tabId,
            },
          },
          items: {
            connect: itemConnectIds.map((id) => ({
              id,
            })),
          },
          dishs: {
            connect: dto.dishes.map((dish) => ({
              id: dish.id,
            })),
          },
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
}
