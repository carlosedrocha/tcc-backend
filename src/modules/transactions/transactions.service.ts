import {
  BadRequestException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(dto: CreateTransactionDto) {
    try {
      const transaction = await this.prisma.transaction.create({
        data: {
          amount: dto.amount,
          category: dto.category,
          description: dto.description,
          paymentMethod: dto.paymentMethod,
          transactionType: dto.type,
          status: dto.status,
          ...(dto.tabId && { tabId: dto.tabId }),
        },
      });
      return transaction;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao criar transação');
    }
  }
}
