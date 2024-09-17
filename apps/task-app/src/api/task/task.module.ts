import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepositoryModule } from '@app/repository/task/task.module';

@Module({
  imports: [TaskRepositoryModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
