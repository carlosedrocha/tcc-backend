import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
<<<<<<< HEAD
import { TabService } from '../tab/tab.service';
import { TransactionsService } from '../transactions/transactions.service';
import { WaiterBellController } from './waiter-bell.controller';
import { WaiterBellGateway } from './waiter-bell.gateway';
=======
import { TransactionsService } from '../transactions/transactions.service';
>>>>>>> queue_spotify

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
