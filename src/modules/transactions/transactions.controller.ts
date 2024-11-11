import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('status-summary')
  async getAggregatedStatus() {
    return this.transactionsService.getAggregatedStatus();
  }

  @Get('list')
  async getTransactions(@Query() filter: any) {
    return this.transactionsService.getTransactions(filter);
  }
}
