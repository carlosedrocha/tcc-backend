import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto, UpdateSectionDto } from './dto';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  // Buscar todas as seções (opcionalmente filtrando pelo menuId)
  async getSections(menuId?: string) {
    try {
      const whereClause = menuId
        ? { menuId, deletedAt: null }
        : { deletedAt: null };
      return await this.prisma.section.findMany({
        where: whereClause,
        include: {
          dishes: true, // Inclui pratos associados
          menu: true, // Inclui menus associados
          items: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao buscar seções');
    }
  }

  // Buscar uma seção por ID
  async getSectionById(id: string) {
    try {
      const section = await this.prisma.section.findUnique({
        where: { id },
        include: {
          dishes: true, // Inclui pratos associados
          menu: true, // Inclui menus associados
        },
      });

      if (!section || section.deletedAt) {
        throw new NotFoundException('Seção não encontrada');
      }

      return section;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar seção');
    }
  }

  // Criar uma nova seção
  async createSection(dto: CreateSectionDto) {
    try {
      console.log(dto);
      // Criar a seção com os dados fornecidos
      const section = await this.prisma.section.create({
        data: {
          name: dto.name,
          menu: {
            connect: dto.menuIds?.map((id) => ({ id })) || [], // Relaciona com os menus
          },
          dishes: {
            connect: dto.dishIds?.map((id) => ({ id })) || [], // Relaciona pratos
          },
          items: {
            connect: dto.itemIds?.map((id) => ({ id })) || [], // Relaciona itens (novidade)
          },
        },
        include: {
          dishes: true, // Inclui pratos associados
          menu: true, // Inclui menus associados
          items: true, // Inclui itens associados (novidade)
        },
      });

      // Se houver menus associados, adicionar a seção ao menu
      if (dto.menuIds?.length) {
        for (const menuId of dto.menuIds) {
          console.log(menuId);
          await this.prisma.menu.update({
            where: { id: menuId },
            data: {
              sections: {
                connect: { id: section.id }, // Associa a seção ao menu
              },
            },
          });
        }
      }

      return section;
    } catch (error) {
      throw new BadRequestException('Erro ao criar seção');
    }
  }

  // Atualizar uma seção existente
  // Atualizar uma seção existente
  // Atualizar uma seção existente
  async updateSection(id: string, dto: UpdateSectionDto) {
    try {
      const sectionExists = await this.prisma.section.findUnique({
        where: { id },
      });

      if (!sectionExists || sectionExists.deletedAt) {
        throw new NotFoundException('Seção não encontrada');
      }

      // Atualiza a seção com os dados fornecidos
      const updatedSection = await this.prisma.section.update({
        where: { id },
        data: {
          name: dto.name,
          disabled: dto.disabled,
          menu: {
            connect: dto.menuIds?.map((id) => ({ id })) || [], // Atualiza menus associados
          },
          dishes: dto.dishIds
            ? {
                set: dto.dishIds.map((dishId) => ({ id: dishId })), // Substitui pratos existentes
              }
            : undefined,
          items: dto.itemIds
            ? {
                set: dto.itemIds.map((itemId) => ({ id: itemId })), // Substitui itens existentes
              }
            : undefined,
        },
        include: {
          dishes: true, // Inclui pratos associados
          menu: true, // Inclui menus associados
          items: true, // Inclui itens associados
        },
      });

      // Se houver menus associados, adicionar a seção ao menu
      if (dto.menuIds?.length) {
        for (const menuId of dto.menuIds) {
          console.log(menuId);
          await this.prisma.menu.update({
            where: { id: menuId },
            data: {
              sections: {
                connect: { id: updatedSection.id }, // Associa a seção ao menu
              },
            },
          });
        }
      }

      return updatedSection;
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar seção');
    }
  }

  // Excluir logicamente uma seção
  async deleteSection(id: string) {
    try {
      const sectionExists = await this.prisma.section.findUnique({
        where: { id },
      });

      if (!sectionExists || sectionExists.deletedAt) {
        throw new NotFoundException('Seção não encontrada');
      }

      return await this.prisma.section.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao deletar seção');
    }
  }
}
