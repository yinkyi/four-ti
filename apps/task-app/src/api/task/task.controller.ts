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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { AbstractController } from '../../common/controller/abstract-controller';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { TaskPresenter } from './presenters/task.presenter';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../../common/decorator/get-user.decorator';
import { AuthUserI } from '@app/auth0/interface';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
@Serialize(TaskPresenter)
@ApiBearerAuth()
export class TaskController extends AbstractController {
  constructor(
    @Inject(REQUEST)
    protected readonly Request: Request,
    private readonly taskService: TaskService,
  ) {
    super(Request);
  }

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: AuthUserI,
  ) {
    return await this.taskService.create(createTaskDto, user.userId);
  }

  @Get()
  async findAll(@Query() getTaskDto: GetTaskDto, @GetUser() user: AuthUserI) {
    return await this.taskService.findAll(
      {
        ...getTaskDto,
        route: this.url,
      },
      user.userId,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.remove(id);
  }
}
