import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepositoryModule } from '@app/repository/todo/todo.module';

@Module({
  imports: [TodoRepositoryModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
