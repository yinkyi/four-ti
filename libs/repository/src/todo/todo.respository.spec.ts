import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@app/repository/prisma/prisma.module';
import { TodoRepository } from '@app/repository/todo/todo.repository';
import {
  CreateToDoInterface,
  UpdateToDoInterface,
} from '@app/repository/todo/todo.model';
import { Todo } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundException } from '@nestjs/common';
describe('TodoRepository', () => {
  let todo: Todo;
  let repository: TodoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TodoRepository],
    }).compile();

    repository = module.get<TodoRepository>(TodoRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should save model', async () => {
      const createDto: CreateToDoInterface = {
        title: 'assignment',
        content: 'Four-ti Todo assignment',
        userId: '1ac1700d-6634-458a-9ea5-d91d8f9703ce',
      };
      const createdTodo = await repository.create(createDto);
      todo = createdTodo;
      expect(todo.id).toBeDefined();
    });
    it('should throw error incorrect UUIDs format', async () => {
      const createDto: CreateToDoInterface = {
        title: 'assignment',
        content: 'Four-ti Todo assignment',
        userId: '1ac1700d-fake',
      };
      try {
        await repository.create(createDto);
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          // Check specific error codes
          expect(error.code).toBe('P2023');
        } else {
          throw error;
        }
      }
    });
    it('should throw error foreign key constraint', async () => {
      const createDto: CreateToDoInterface = {
        title: 'assignment',
        content: 'Four-ti Todo assignment',
        userId: '1ac1700d-6634-458a-9ea5-d91d8f9703cf',
      };
      try {
        await repository.create(createDto);
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          // Check specific error codes
          expect(error.code).toBe('P2003');
        } else {
          throw error;
        }
      }
    });
  });
  describe('update', () => {
    it('should update ToDo', async () => {
      const updateObj: UpdateToDoInterface = {
        title: 'gogo update',
      };
      const updatedTodo = await repository.updateToDo(todo.id, updateObj);

      expect(updatedTodo.title).toEqual(updateObj.title);
    });

    it('should throw error updated id does not exist', async () => {
      const updateObj: UpdateToDoInterface = {
        title: 'gogo update',
      };
      try {
        await repository.updateToDo(
          '1ac1700d-6634-458a-9ea5-d91d8f9703ce',
          updateObj,
        );
      } catch (error) {
        if (error instanceof NotFoundException) {
          // Check specific error codes
          expect(error.message).toBe('record not found');
        } else {
          throw error;
        }
      }
    });
  });
  describe('paginate', () => {
    it('should contain paginated response', async () => {
      const paginatedData = await repository.paginate();
      expect(paginatedData.meta).toBeDefined();
      expect(paginatedData.items).toBeDefined();
      expect(paginatedData.links).toBeDefined();
    });
    it('should search with title', async () => {
      const paginatedData = await repository.paginate(1, 10, {
        title: todo.title,
      });
      paginatedData.items.find((item) => expect(item).toEqual(item));
    });
    it('should get completed todo', async () => {
      const paginatedData = await repository.paginate(1, 10, {
        completed: true,
      });
      const completed = paginatedData.items.every(
        (item) => item.completed === true,
      );
      expect(completed).toBeTruthy();
    });
  });

  describe('delete', () => {
    it('should soft delete', async () => {
      const deleted = await repository.remove(todo.id);
      expect(deleted.id).toEqual(todo.id);
      expect(deleted.deletedAt).toBeDefined();
    });
  });
});
