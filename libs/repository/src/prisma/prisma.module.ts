import { Module } from '@nestjs/common';
import { PrismaService } from '@app/repository/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
