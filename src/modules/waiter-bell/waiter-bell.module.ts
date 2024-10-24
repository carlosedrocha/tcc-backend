import { Module } from '@nestjs/common';
import { WaiterBellController } from './waiter-bell.controller';
import { WaiterBellService } from './waiter-bell.service';
import { WaiterBellGateway } from './waiter-bell.gateway';
import { TabService } from '../tab/tab.service';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsService } from '../transactions/transactions.service';

@Module({
  controllers: [WaiterBellController],
  providers: [
    WaiterBellGateway,
    TabService,
    PrismaService,
    TransactionsService,
  ],
})
export class WaiterBellModule {}
