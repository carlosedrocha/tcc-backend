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
        include: {
          sections: {
            include: {
              dishes: true,
              items: true,
            },
          },
        },
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
        },
        include: {
          sections: {
            include: {
              dishes: true,
            },
          },
        },
      });

      if (!menu || menu.deletedAt) {
        throw new NotFoundException('Menu não encontrado');
      }

      return menu;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar menu');
    }
  }

  // Alteração aqui
  async createMenu(dto: CreateMenuDto) {
    try {
      // Buscar as seções pelo ID
      const sections = await this.prisma.section.findMany({
        where: {
          id: {
            in: dto.sections.flatMap((section) => section.id), // Use flatMap para garantir que seja um array de strings
          },
        },
      });

      // Verificar se todas as seções foram encontradas
      if (sections.length !== dto.sections.length) {
        throw new NotFoundException('Uma ou mais seções não foram encontradas');
      }

      // Criar o menu com as seções associadas
      const menu = await this.prisma.menu.create({
        data: {
          name: dto.name,
          description: dto.description,
          sections: {
            connect: sections.map((section) => ({ id: section.id })),
          },
        },
        include: {
          sections: {
            include: {
              dishes: true,
            },
          },
        },
      });

      return menu;
    } catch (error) {
      throw new BadRequestException('Erro ao criar menu');
    }
  }

  // Alteração aqui
  async updateMenu(id: string, dto: UpdateMenuDto) {
    try {
      // Buscar as seções pelo ID para garantir que existam
      const sections = await this.prisma.section.findMany({
        where: {
          id: {
            in: dto.sections.map((section) => section.id),
          },
        },
      });

      // Verificar se todas as seções foram encontradas
      if (sections.length !== dto.sections.length) {
        throw new NotFoundException('Uma ou mais seções não foram encontradas');
      }

      // Atualizar o menu com as seções associadas
      const menu = await this.prisma.menu.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          description: dto.description,
          sections: dto.sections
            ? {
                connect: sections.map((section) => ({ id: section.id })),
              }
            : undefined,
        },
        include: {
          sections: {
            include: {
              dishes: true,
            },
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
