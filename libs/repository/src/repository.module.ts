import { Module } from '@nestjs/common';
import { RepositoryService } from '@app/repository/repository.service';
import { TaskRepositoryModule } from '@app/repository/task/task.module';
import { PrismaModule } from '@app/repository/prisma/prisma.module';

@Module({
  imports: [TaskRepositoryModule, PrismaModule],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
