import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto, UpdateItemDto } from './dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async createItem(dto: CreateItemDto) {
    try {
      const checkType = await this.prisma.itemType.findUnique({
        where: {
          id: dto.typeId,
        },
      });

      if (!checkType) {
        throw new NotFoundException('Tipo não encontrado');
      }

      const item = await this.prisma.item.create({
        data: {
          name: dto.name,
          description: dto.description,
          cost: dto.cost,
          type: {
            connect: {
              id: dto.typeId,
            },
          },
          measurementUnit: dto.measurementUnit,
          measurementUnitValue: dto.measurementUnitValue,
          stock: {
            create: {
              quantity: 0,
            },
          },
        },
      });

      return item;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao criar item');
    }
  }

  async getItems() {
    try {
      const items = await this.prisma.item.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          type: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return items;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar itens');
    }
  }

  async getItemById(id: string) {
    try {
      const item = await this.prisma.item.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
        include: {
          type: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!item) {
        throw new NotFoundException('Item não encontrado');
      }

      return item;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao buscar item');
    }
  }

  async updateItem(id: string, dto: UpdateItemDto) {
    try {
      const item = await this.prisma.item.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          description: dto.description,
          cost: dto.cost,
          measurementUnit: dto.measurementUnit,
          measurementUnitValue: dto.measurementUnitValue,
          disabled: dto.disabled,
          type: {
            connect: {
              id: dto.typeId,
            },
          },
        },
      });

      return item;
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar item');
    }
  }

  async deleteItem(id: string) {
    try {
      const deletedItem = await this.prisma.item.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return deletedItem;
    } catch (error) {
      throw new BadRequestException('Erro ao deletar item');
    }
  }
}
