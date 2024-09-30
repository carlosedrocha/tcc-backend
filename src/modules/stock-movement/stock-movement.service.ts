import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddStockEntryDto } from './dto/stock-movement/add-stock-entry.dto';

@Injectable()
export class StockMovementService {
  constructor(private prisma: PrismaService) {}

  async addStockEntry(stockId: string, dto: AddStockEntryDto) {
    try {
      const stock = await this.prisma.stock.findUnique({
        where: {
          id: stockId,
          deletedAt: null,
        },
      });

      if (!stock) {
        throw new NotFoundException('Estoque não encontrado');
      }

      let transaction;
      if (dto.transaction) {
        transaction = await this.prisma.transaction.create({
          data: {
            amount: dto.transaction.amount,
            category: dto.transaction.category,
            description: dto.transaction.description,
            paymentMethod: dto.transaction.paymentMethod,
            transactionType: dto.transaction.type,
            status: dto.transaction.status,
          },
        });
      }

      const stockEntry = await this.prisma.stockMovement.create({
        data: {
          stockId: stock.id,
          quantity: dto.quantity,
          description: dto.description ? dto.description : undefined,
          movementType: dto.movementType,

          //todo: isolate this
          transactionId: transaction.id,
        },
      });

      const updateStockQuantity = await this.prisma.stock.update({
        where: {
          id: stock.id,
        },
        data: {
          quantity: stock.quantity + dto.quantity,
        },
      });
      return { stockEntry, updateStockQuantity };
    } catch (error) {
      console.log(error);

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      console.log(error);

      throw new BadRequestException('Erro ao registrar entrada');
    }
  }
}
