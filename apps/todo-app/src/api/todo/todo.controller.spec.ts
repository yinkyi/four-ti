import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
import {
  MockAbstractController,
  mockRequest,
} from '../../common/controller/mock-abstract-controller';
import { AbstractController } from '../../common/controller/abstract-controller';
import { GetTodoDto } from 'apps/todo-app/src/api/todo/dto/get-todo.dto';
import { AuthUserI } from '@app/auth0/interface';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

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

  const createDto: CreateTodoDto = {
    title: 'Test Todo',
    content: 'Test Content',
  };

  const todoPresenter: Todo = {
    id: 'c6e1796b-2ef2-4544-9b31-f77d35af260d',
    title: 'Test Todo',
    content: 'Test Content',
    userId: '1ac1700d-6634-458a-9ea5-d91d8f9703ce',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockTodoService = {
    create: jest.fn().mockResolvedValue(todoPresenter),
    findAll: jest.fn().mockResolvedValueOnce([todoPresenter]),
    findOne: jest.fn().mockResolvedValue(todoPresenter),
    update: jest
      .fn()
      .mockImplementation((id: string, updateDto: CreateTodoDto) => {
        return Promise.resolve({
          id,
          ...updateDto,
        });
      }),
    remove: jest.fn().mockImplementation((id: string) => {
      return Promise.resolve({
        id,
        ...todoPresenter,
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    })
      .overrideProvider(AbstractController)
      .useValue(MockAbstractController)
      .compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create todo and should call todo service create', async () => {
      // Call the getData method of the controller
      const result = await controller.create(createDto, user);
      expect(result).toEqual(todoPresenter);
      expect(service.create).toHaveBeenCalledWith(createDto, user.userId);
    });
  });

  describe('update', () => {
    it('update and should call todo service update', async () => {
      const result = await controller.update(todoPresenter.id, createDto);
      expect(result.id).toEqual(todoPresenter.id);
      expect(service.update).toHaveBeenCalledWith(todoPresenter.id, createDto);
    });
  });

  describe('findOne', () => {
    it('should return an todo of given id', async () => {
      await controller.findOne(todoPresenter.id);
      expect(service.findOne).toHaveBeenCalledWith(todoPresenter.id);
    });
  });

  describe('findAll', () => {
    it('should return releated todo ', async () => {
      const getDto: GetTodoDto = {
        page: 1,
        limit: 10,
        title: 'Test Todo',
        route: 'http://localhost/mock-url',
      };
      await controller.findAll(getDto);
      expect(service.findAll).toHaveBeenCalledWith(getDto);
    });
  });

  describe('remove', () => {
    it('remove and should call todo service remvoe', async () => {
      const result = await controller.remove(todoPresenter.id);
      expect(result.id).toEqual(todoPresenter.id);
      expect(service.remove).toHaveBeenCalledWith(todoPresenter.id);
    });
  });
});
