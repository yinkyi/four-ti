import {
  CreateToDoInterface,
  UpdateToDoInterface,
} from 'libs/repository/src/todo/todo.model';
import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from '@app/repository/prisma/prisma.service';
import { GenericRepository } from '@app/repository/common/generic.repository';
import { DefaultArgs } from '@prisma/client/runtime/library';
@Injectable()
export class TodoRepository extends GenericRepository<
  Todo,
  Prisma.TodoWhereUniqueInput,
  Prisma.TodoWhereInput,
  Prisma.TodoOrderByWithRelationInput,
  Prisma.TodoInclude,
  CreateToDoInterface,
  UpdateToDoInterface
> {
  protected loadRelations: Prisma.TodoInclude<DefaultArgs> = {
    user: true,
  };
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, Prisma.ModelName.Todo);
  }

  async updateToDo(
    id: string,
    updateToDoInterface: UpdateToDoInterface,
  ): Promise<Todo> {
    await this.findUnique({
      id: id,
      userId: updateToDoInterface.userId,
    });
    return await this.update(id, updateToDoInterface);
  }
}
