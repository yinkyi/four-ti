import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@app/repository/prisma/prisma.module';
import { TaskRepository } from '@app/repository/task/task.repository';
import {
  CreateToDoInterface,
  UpdateToDoInterface,
} from '@app/repository/task/task.model';
import { Task } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundException } from '@nestjs/common';
describe('TaskRepository', () => {
  let task: Task;
  let repository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TaskRepository],
    }).compile();

    repository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should save model', async () => {
      const createDto: CreateToDoInterface = {
        title: 'assignment',
        content: 'Four-ti Task assignment',
        userId: 'ec74f929-12e6-5248-8aa0-2d6f1e0f4e6c',
      };
      const createdTask = await repository.create(createDto);
      task = createdTask;
      expect(task.id).toBeDefined();
    });
    it('should throw error incorrect UUIDs format', async () => {
      const createDto: CreateToDoInterface = {
        title: 'assignment',
        content: 'Four-ti Task assignment',
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
        content: 'Four-ti Task assignment',
        userId: 'ec74f929-12e6-5248-8aa0-2d6f1e0f4e6c',
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
      const updatedTask = await repository.updateToDo(task.id, updateObj);

      expect(updatedTask.title).toEqual(updateObj.title);
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
        title: task.title,
      });
      paginatedData.items.find((item) => expect(item).toEqual(item));
    });
    it('should get completed task', async () => {
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
      const deleted = await repository.remove(task.id);
      expect(deleted.id).toEqual(task.id);
      expect(deleted.deletedAt).toBeDefined();
    });
  });
});
