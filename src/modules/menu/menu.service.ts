import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMenus() {
    try {
      const menus = await this.prisma.menu.findMany({
        where: {
          deletedAt: null,
        },
        include:{
          dishes:true,
        }
      });

      return menus;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar menus');
    }
  }

  async getMenuById(id: string) {
    try {
      const menu = await this.prisma.menu.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
        include:{
          dishes:true,
        }
      });

      if (!menu) {
        throw new NotFoundException('Menu não encontrado');
      }

      return menu;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao buscar menu');
    }
  }

  async createManu(dto: CreateMenuDto) {
    try {
      const menu = await this.prisma.menu.create({
        data: {
          name: dto.name,
          description: dto.description,
          dishes: {
            connect: dto.dishIds.map((id) => ({ id })),
          },
        },
      });

      return menu;
    } catch (error) {
      throw new BadRequestException('Erro ao criar menu');
    }
  }

  async updateMenu(id: string, dto: UpdateMenuDto) {
    try {
      const menu = await this.prisma.menu.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          description: dto.description,
          dishes: {
            connect: dto.dishIds.map((id) => ({ id })),
          },
        },
      });

      return menu;
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar menu');
    }
  }

  async deleteMenu(id: string) {
    try {
      await this.prisma.menu.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao deletar menu');
    }
  }
}
