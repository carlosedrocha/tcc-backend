import { BadRequestException, Injectable } from '@nestjs/common';
import { endOfMonth, startOfMonth } from 'date-fns';
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
      const {
        category,
        status,
        transactionType,
        paymentMethod,
        startDate,
        endDate,
      } = filter;
      return await this.prisma.transaction.findMany({
        where: {
          category: category || undefined,
          status: status || undefined,
          transactionType: transactionType || undefined,
          paymentMethod: paymentMethod || undefined,
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

  // get current month revenue
  async getCurrentMonthIncome() {
    try {
      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());

      // Soma todas as transações do tipo SALE no mês atual
      const income = await this.prisma.transaction.aggregate({
        where: {
          transactionType: 'INCOME',
          date: {
            gte: startDate,
            lte: endDate,
          },
          status: 'PAID', // Considerar apenas transações pagas
        },
        _sum: {
          amount: true,
        },
      });

      return income._sum.amount || 0; // Retorna 0 se não houver transações
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao buscar receita do mês atual');
    }
  }

  async getCurrentMonthExpenses() {
    try {
      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());

      // Soma todas as transações do tipo EXPENSE no mês atual
      const totalExpense = await this.prisma.transaction.aggregate({
        where: {
          transactionType: 'EXPENSE', // Considera apenas despesas
          date: {
            gte: startDate,
            lte: endDate,
          },
          status: 'PAID', // Considerar apenas transações pagas
        },
        _sum: {
          amount: true,
        },
      });

      return totalExpense._sum.amount || 0; // Retorna 0 se não houver transações
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Erro ao buscar despesas totais do mês atual',
      );
    }
  }

  async getMonthAverageTicket() {
    try {
      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());

      // Soma todas as transações do tipo SALE no mês atual

      const totalRevenue = await this.prisma.transaction.aggregate({
        where: {
          transactionType: 'INCOME',
          date: {
            gte: startDate,
            lte: endDate,
          },
          status: 'PAID',
        },
        _sum: {
          amount: true,
        },
      });

      const totalTransactions = await this.prisma.transaction.count({
        where: {
          transactionType: 'INCOME',
          date: {
            gte: startDate,
            lte: endDate,
          },
          status: 'PAID',
        },
      });

      return totalRevenue._sum.amount / totalTransactions || 0;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao buscar ticket médio do mês atual');
    }
  }
}
