import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockMovementService } from './stock-movement.service';
import { StockMovementController } from './stock-movement.controller';

@Module({
  providers: [StockMovementService, PrismaService],
  controllers: [StockMovementController],
})
export class StockMovementModule {}
