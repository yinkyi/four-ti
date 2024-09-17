import {
  CreateToDoInterface,
  UpdateToDoInterface,
} from 'libs/repository/src/task/task.model';
import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from '@app/repository/prisma/prisma.service';
import { GenericRepository } from '@app/repository/common/generic.repository';
import { DefaultArgs } from '@prisma/client/runtime/library';
@Injectable()
export class TaskRepository extends GenericRepository<
  Task,
  Prisma.TaskWhereUniqueInput,
  Prisma.TaskWhereInput,
  Prisma.TaskOrderByWithRelationInput,
  Prisma.TaskInclude,
  CreateToDoInterface,
  UpdateToDoInterface
> {
  protected loadRelations: Prisma.TaskInclude<DefaultArgs> = {
    user: true,
  };
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, Prisma.ModelName.Task);
  }

  async updateToDo(
    id: string,
    updateToDoInterface: UpdateToDoInterface,
  ): Promise<Task> {
    await this.findUnique({
      id: id,
      userId: updateToDoInterface.userId,
    });
    return await this.update(id, updateToDoInterface);
  }
}
