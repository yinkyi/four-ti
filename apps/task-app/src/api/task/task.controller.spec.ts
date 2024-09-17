import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
import {
  MockAbstractController,
  mockRequest,
} from '../../common/controller/mock-abstract-controller';
import { AbstractController } from '../../common/controller/abstract-controller';
import { GetTaskDto } from 'apps/task-app/src/api/task/dto/get-task.dto';
import { AuthUserI } from '@app/auth0/interface';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const user: AuthUserI = {
    userId: 'ec74f929-12e6-5248-8aa0-2d6f1e0f4e6c',
    roles: '',
    auth0UserId: 'google-oauth2|107163367946670487684',
    iss: '',
    sub: '',
    iat: 0,
    exp: 0,
    scope: '',
    azp: '',
  };

  const createDto: CreateTaskDto = {
    title: 'Test Task',
    content: 'Test Content',
  };

  const taskPresenter: Task = {
    id: 'c6e1796b-2ef2-4544-9b31-f77d35af260d',
    title: 'Test Task',
    content: 'Test Content',
    userId: '1ac1700d-6634-458a-9ea5-d91d8f9703ce',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockTaskService = {
    create: jest.fn().mockResolvedValue(taskPresenter),
    findAll: jest.fn().mockResolvedValueOnce([taskPresenter]),
    findOne: jest.fn().mockResolvedValue(taskPresenter),
    update: jest
      .fn()
      .mockImplementation((id: string, updateDto: CreateTaskDto) => {
        return Promise.resolve({
          id,
          ...updateDto,
        });
      }),
    remove: jest.fn().mockImplementation((id: string) => {
      return Promise.resolve({
        id,
        ...taskPresenter,
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    })
      .overrideProvider(AbstractController)
      .useValue(MockAbstractController)
      .compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create task and should call task service create', async () => {
      // Call the getData method of the controller
      const result = await controller.create(createDto, user);
      expect(result).toEqual(taskPresenter);
      expect(service.create).toHaveBeenCalledWith(createDto, user.userId);
    });
  });

  describe('update', () => {
    it('update and should call task service update', async () => {
      const result = await controller.update(taskPresenter.id, createDto);
      expect(result.id).toEqual(taskPresenter.id);
      expect(service.update).toHaveBeenCalledWith(taskPresenter.id, createDto);
    });
  });

  describe('findOne', () => {
    it('should return an task of given id', async () => {
      await controller.findOne(taskPresenter.id);
      expect(service.findOne).toHaveBeenCalledWith(taskPresenter.id);
    });
  });

  describe('findAll', () => {
    it('should return releated task ', async () => {
      const getDto: GetTaskDto = {
        page: 1,
        limit: 10,
        title: 'Test Task',
        route: 'http://localhost/mock-url',
      };
      await controller.findAll(getDto);
      expect(service.findAll).toHaveBeenCalledWith(getDto);
    });
  });

  describe('remove', () => {
    it('remove and should call task service remvoe', async () => {
      const result = await controller.remove(taskPresenter.id);
      expect(result.id).toEqual(taskPresenter.id);
      expect(service.remove).toHaveBeenCalledWith(taskPresenter.id);
    });
  });
});
