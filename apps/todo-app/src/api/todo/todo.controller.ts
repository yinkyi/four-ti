import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodoDto } from './dto/get-todo.dto';
import { AbstractController } from '../../common/controller/abstract-controller';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { TodoPresenter } from './presenters/todo.presenter';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../../common/decorator/get-user.decorator';
import { AuthUserI } from '@app/auth0/interface';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
@Serialize(TodoPresenter)
@ApiBearerAuth()
export class TodoController extends AbstractController {
  constructor(
    @Inject(REQUEST)
    protected readonly Request: Request,
    private readonly todoService: TodoService,
  ) {
    super(Request);
  }

  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: AuthUserI,
  ) {
    return await this.todoService.create(createTodoDto, user.userId);
  }

  @Get()
  async findAll(@Query() getTodoDto: GetTodoDto) {
    return await this.todoService.findAll({
      ...getTodoDto,
      route: this.url,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.todoService.remove(id);
  }
}
