import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TabController } from './tab.controller';
import { TabService } from './tab.service';

@Module({
  controllers: [TabController],
  providers: [TabService, PrismaService],
})
export class TabModule {}
