import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';

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

  async updateTransaction(id: number, dto: UpdateTransactionDto) {
    try {
      const transaction = await this.prisma.transaction.update({
        where: {
          id: id,
        },
        data: {
          amount: dto.amount,
          category: dto.category,
          description: dto.description,
          paymentMethod: dto.paymentMethod,
          transactionType: dto.type,
          status: dto.status,
        },
      });
      return transaction;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao atualizar transação');
    }
  }
  async getTransactions(filter: any) {
    try {
      console.log('here');
      const { category, status, transactionType, startDate, endDate } = filter;
      return await this.prisma.transaction.findMany({
        where: {
          category: category || undefined,
          status: status || undefined,
          transactionType: transactionType || undefined,
          date: {
            gte: startDate ? new Date(startDate) : undefined,
            lte: endDate ? new Date(endDate) : undefined,
          },
        },
        include: {
          tab: true, // Include related tab information if needed
          stockMovements: true, // Include stock movements for inventory impact
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao buscar transações');
    }
  }

  async getAggregatedStatus() {
    try {
      return await this.prisma.transaction.groupBy({
        by: ['status', 'transactionType'],
        _sum: { amount: true },
        _count: { id: true },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao buscar status das transações');
    }
  }
}
