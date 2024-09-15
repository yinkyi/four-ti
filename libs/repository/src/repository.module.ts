import { Module } from '@nestjs/common';
import { RepositoryService } from '@app/repository/repository.service';
import { TodoRepositoryModule } from '@app/repository/todo/todo.module';
import { PrismaModule } from '@app/repository/prisma/prisma.module';

@Module({
  imports: [TodoRepositoryModule, PrismaModule],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
