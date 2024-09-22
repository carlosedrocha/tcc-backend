import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  getStocks() {
    try {
      return this.prisma.stock.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          item: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao buscar estoque');
    }
  }

  getStockById(id: string) {
    try {
      return this.prisma.stock.findUnique({
        where: {
          id: id,
        },
        include: {
          item: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        'Erro ao buscar estoque - estoque nao encontrado',
      );
    }
  }
}
