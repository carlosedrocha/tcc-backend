import { BadRequestException, Injectable } from '@nestjs/common';
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionService: TransactionsService,
  ) {}

  async getRevenueAndExpensesForLastSixMonths() {
    try {
      const currentDate = new Date();
      const data = [];

      for (let i = 5; i >= 0; i--) {
        const monthStart = startOfMonth(subMonths(currentDate, i));
        const monthEnd = endOfMonth(subMonths(currentDate, i));
        const monthName = format(monthStart, 'MMMM');

        // Total Revenue
        const totalRevenue = await this.prisma.transaction.aggregate({
          where: {
            transactionType: 'SALE',
            date: {
              gte: monthStart,
              lte: monthEnd,
            },
            status: 'PAID',
          },
          _sum: {
            amount: true,
          },
        });

        // Total Expenses
        const totalExpense = await this.prisma.transaction.aggregate({
          where: {
            transactionType: 'EXPENSE',
            date: {
              gte: monthStart,
              lte: monthEnd,
            },
            status: 'PAID',
          },
          _sum: {
            amount: true,
          },
        });

        data.push({
          month: monthName,
          income: totalRevenue._sum.amount || 0,
          expense: totalExpense._sum.amount || 0,
        });
      }

      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao buscar dados do dashboard');
    }
  }

  async getCurrentMonthExpensesFromTransaction() {
    try {
      const totalExpenses =
        await this.transactionService.getCurrentMonthExpenses();

      return totalExpenses;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao buscar despesas do mês atual');
    }
  }

  async getCurrentMonthIncomeFromTransaction() {
    try {
      const totalIncome = await this.transactionService.getCurrentMonthIncome();

      return totalIncome;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao buscar receita do mês atual');
    }
  }

  async mainData() {
    try {
      const revenueAndExpensesForLastSixMonths =
        await this.getRevenueAndExpensesForLastSixMonths();

      const currentMonthIncome =
        await this.getCurrentMonthIncomeFromTransaction();

      const currentMonthExpenses =
        await this.getCurrentMonthExpensesFromTransaction();

      const activeTabs = await this.prisma.tab.count({
        where: {
          status: 'OPEN',
        },
      });

      const averageTicket =
        await this.transactionService.getMonthAverageTicket();

      return {
        chartData: revenueAndExpensesForLastSixMonths,
        cards: {
          activeTabs: {
            title: 'Comandas Ativas',
            value: activeTabs,
            description: 'Comandas com pedidos em aberto',
            icon: 'shopping-cart',
          },
          income: {
            title: 'Receita',
            value: currentMonthIncome.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }),
            description: 'Receita total do mês',
            icon: 'dollar-sign',
          },
          expense: {
            value: currentMonthExpenses.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }),
            title: 'Despesas',
            description: 'Despesas totais do mês',
            icon: 'credit-card',
          },
          averageTicket: {
            title: 'Ticket Médio',
            value: averageTicket.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }),
            description: 'Valor médio das vendas',
            icon: 'receipt',
          },
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao buscar dados do dashboard');
    }
  }
}
