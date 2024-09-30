import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TabController } from './tab.controller';
import { TabService } from './tab.service';
import { TransactionsService } from '../transactions/transactions.service';

@Module({
  controllers: [TabController],
  providers: [TabService, PrismaService, TransactionsService],
})
export class TabModule {}
