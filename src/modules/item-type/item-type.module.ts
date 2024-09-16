import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemTypeController } from './item-type.controller';
import { ItemTypeService } from './item-type.service';

@Module({
  controllers: [ItemTypeController],
  providers: [ItemTypeService, PrismaService],
})
export class ItemTypeModule {}
