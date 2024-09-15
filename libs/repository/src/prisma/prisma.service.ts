import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClientExtended } from '@app/repository/prisma/customPrismaClient';

@Injectable()
export class PrismaService
  extends PrismaClientExtended
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
