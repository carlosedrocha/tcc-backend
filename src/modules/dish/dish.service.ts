import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDishDto, UpdateDishDto } from './dto';

@Injectable()
export class DishService {
  constructor(private prisma: PrismaService) {}

  async createDish(dto: CreateDishDto) {
    try {
      const dish = await this.prisma.dish.create({
        data: {
          name: dto.name,
          description: dto.description,
          price: dto.price,
          categories: {
            connect: dto.categoriesIds
              ? dto.categoriesIds.map((categoryId) => ({ id: categoryId }))
              : undefined,
          },
          items: {
            connect: dto.itemsIds
              ? dto.itemsIds.map((itemId) => ({ id: itemId }))
              : undefined,
          },
        },
        include: {
          categories: true,
          items: true,
        },
      });

      return dish;
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Erro ao criar prato');
    }
  }

  async getDishes() {
    try {
      const dishes = await this.prisma.dish.findMany({
        where: {
          deletedAt: null,
        },
      });
      return dishes;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar pratos');
    }
  }

  async getDishById(id: string) {
    try {
      const dish = await this.prisma.dish.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!dish) {
        throw new NotFoundException('Prato não encontrado');
      }

      return dish;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao buscar prato');
    }
  }

  async updateDish(id: string, dto: UpdateDishDto) {
    try {
      const dish = await this.prisma.dish.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          description: dto.description,
          price: dto.price,
          ...(dto.categoriesIds && {
            categories: {
              connect: dto.categoriesIds
                ? dto.categoriesIds.map((categoryId) => ({ id: categoryId }))
                : undefined,
            },
          }),
          ...(dto.itemsIds && {
            items: {
              connect: dto.itemsIds
                ? dto.itemsIds.map((itemId) => ({ id: itemId }))
                : undefined,
            },
          }),
        },
      });

      return dish;
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar prato');
    }
  }

  async deleteDish(id: string) {
    try {
      const deletedDish = await this.prisma.dish.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return deletedDish;
    } catch (error) {
      throw new BadRequestException('Erro ao deletar prato');
    }
  }
}