import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockMovementService } from '../stock-movement/stock-movement.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, StockMovementService],
})
export class OrderModule {}
