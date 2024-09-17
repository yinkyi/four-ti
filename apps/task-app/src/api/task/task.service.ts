import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from '@app/repository/task/task.repository';
import { GetTaskDto } from 'apps/task-app/src/api/task/dto/get-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly repo: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    return await this.repo.create({ ...createTaskDto, userId });
  }

  async findAll(getTaskDto: GetTaskDto, userId: string) {
    return await this.repo.paginate(
      getTaskDto.page,
      getTaskDto.limit,
      {
        title: getTaskDto.title,
        completed: getTaskDto.completed,
        userId,
      },
      {
        createdAt: 'desc',
      },
    );
  }

  async findOne(id: string) {
    return await this.repo.findUnique({ id });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.repo.updateToDo(id, updateTaskDto);
  }

  async remove(id: string) {
    return await this.repo.remove(id);
  }
}
