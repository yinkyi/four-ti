import { Module } from '@nestjs/common';
import { TodoRepository } from 'libs/repository/src/todo/todo.repository';
import { PrismaModule } from '@app/repository/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TodoRepository],
  exports: [TodoRepository],
})
export class TodoRepositoryModule {}
