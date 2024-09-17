import { Module } from '@nestjs/common';
import { TaskRepository } from 'libs/repository/src/task/task.repository';
import { PrismaModule } from '@app/repository/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TaskRepository],
  exports: [TaskRepository],
})
export class TaskRepositoryModule {}
