import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from '@app/repository/todo/todo.repository';
import { GetTodoDto } from 'apps/todo-app/src/api/todo/dto/get-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepository) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.repo.create(createTodoDto);
  }

  async findAll(getTodoDto: GetTodoDto) {
    return await this.repo.paginate(
      getTodoDto.page,
      getTodoDto.limit,
      {
        title: getTodoDto.title,
        completed: getTodoDto.completed,
      },
      {
        createdAt: 'desc',
      },
    );
  }

  async findOne(id: string) {
    return await this.repo.findUnique({ id });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return await this.repo.updateToDo(id, updateTodoDto);
  }

  async remove(id: string) {
    return await this.repo.remove(id);
  }
}
