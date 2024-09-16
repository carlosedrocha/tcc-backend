import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(dto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: {
          name: dto.name,
          description: dto.description,
          observation: dto.description,
        },
      });

      return category;
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Erro ao criar categoria');
    }
  }

  async getCategories() {
    try {
      const categories = await this.prisma.category.findMany({
        where: {
          deletedAt: null,
        },
      });
      return categories;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar categorias');
    }
  }

  async getCategoryById(id: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!category) {
        throw new NotFoundException('Categoria não encontrada');
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao buscar categoria');
    }
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    try {
      const category = await this.prisma.category.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          observation: dto.observation,
          description: dto.description,
        },
      });

      return category;
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar categoria');
    }
  }

  async deleteCategory(id: string) {
    try {
      console.log(id)
      const deletedCategory = await this.prisma.category.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return deletedCategory;
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Erro ao deletar categoria');
    }
  }
}
