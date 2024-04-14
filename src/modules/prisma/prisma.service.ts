import { PrismaClient } from '.prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    const postgresUrl = config.get<string>('DATABASE_URL');

    super({
      datasources: {
        db: {
          url: postgresUrl,
        },
      },
    });
  }

  //init prisma module (connect)
  async onModuleInit() {
    await this.$connect();
  }

  //destroy prisma module (close connection)
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
