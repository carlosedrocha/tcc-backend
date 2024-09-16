import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemTypeDto, UpdateItemTypeDto } from '../item-type/dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemTypeService {
  constructor(private prisma: PrismaService) {}

  async createItemType(dto: CreateItemTypeDto) {
    try {
      const itemtype = await this.prisma.itemType.create({
        data: {
          name: dto.name,
        },
      });

      return itemtype;
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Erro ao criar item-type');
    }
  }

  async getItemTypes() {
    try {
      const itemtypes = await this.prisma.itemType.findMany({
        where: {
          deletedAt: null,
        },
      });
      return itemtypes;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar categorias');
    }
  }

  async getItemTypeById(id: string) {
    try {
      const itemtype = await this.prisma.itemType.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      return !itemtype?"":itemtype;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao buscar categoria');
    }
  }

  async updateItemType(id: string, dto: UpdateItemTypeDto) {
    try {
      const itemtype = await this.prisma.itemType.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
        },
      });

      return itemtype;
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar categoria');
    }
  }

  async deleteItemType(id: string) {
    try {
      const deletedItemType = await this.prisma.itemType.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return deletedItemType;
    } catch (error) {
      throw new BadRequestException('Erro ao deletar categoria');
    }
  }
}
