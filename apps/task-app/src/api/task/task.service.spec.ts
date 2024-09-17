import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from '@app/repository/task/task.repository';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from 'apps/task-app/src/api/task/dto/get-task.dto';
import { AuthUserI } from '@app/auth0/interface';

describe('TaskService', () => {
  let repository: TaskRepository;
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
  const mockTasks: Task[] = [
    {
      id: 'c6e1796b-2ef2-4544-9b31-f77d35af260d',
      title: 'Test Task1',
      content: 'Test Content',
      userId: '1ac1700d-6634-458a-9ea5-d91d8f9703ce',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 'c6e1796b-2ef2-4544-9b31-f77d35af260c',
      title: 'Test Task2',
      content: 'Test Content',
      userId: '1ac1700d-6634-458a-9ea5-d91d8f9703ce',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TaskRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(createDto),
            paginate: jest.fn().mockResolvedValueOnce({
              items: mockTasks,
              meta: {
                totalItems: 10,
                itemCount: 2,
                itemsPerPage: 10,
                totalPages: 1,
                currentPage: 1,
              },
              links: {
                first: '?page=1&limit=10',
                previous: null,
                next: null,
                last: '?page=1&limit=10',
              },
            }),
            findUnique: jest
              .fn()
              .mockImplementationOnce((where: { id: string }) => {
                return Promise.resolve(
                  mockTasks.find((task) => task.id === where.id),
                );
              }),
            updateToDo: jest
              .fn()
              .mockImplementationOnce(
                (id: string, updateDto: UpdateTaskDto) => {
                  return Promise.resolve({
                    ...mockTasks[0],
                    ...updateDto,
                  });
                },
              ),
            remove: jest.fn().mockImplementation((id: string) => {
              return Promise.resolve(mockTasks.find((task) => task.id === id));
            }),
          },
        },
        TaskService,
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get(TaskRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  describe('create', () => {
    it('should call create', () => {
      repository.create = jest.fn().mockResolvedValue(createDto);

      return repository
        .create({ ...createDto, userId: user.userId })
        .then((returnedM) => {
          expect(returnedM).toEqual(createDto);
        });
    });
  });

  describe('update', () => {
    it('update and should call repository update', async () => {
      const updateMock: UpdateTaskDto = { title: 'update Title' };
      const result = await service.update(mockTasks[0].id, updateMock);
      expect(result).toEqual({
        ...mockTasks[0],
        ...updateMock,
        updatedAt: result.updatedAt,
      });
      expect(repository.updateToDo).toHaveBeenCalledWith(
        mockTasks[0].id,
        updateMock,
      );
    });
  });

  describe('findOne', () => {
    it('should return a Task object', async () => {
      const result = await service.findOne(mockTasks[0].id);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('completed');
      expect(repository.findUnique).toHaveBeenCalledWith({
        id: mockTasks[0].id,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of Task objects', async () => {
      const getDto: GetTaskDto = {
        page: 1,
        limit: 10,
        title: 'Test Task1',
        route: '/mock-url',
      };
      const result = await service.findAll(getDto);
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.meta).toBeDefined();
      expect(result.items).toBeDefined();
      expect(result.links).toBeDefined();
    });
  });

  describe('remove', () => {
    it('remove and should call repository remove', async () => {
      const result = await service.remove(mockTasks[0].id);
      expect(result.id).toEqual(mockTasks[0].id);
      expect(repository.remove).toHaveBeenCalledWith(mockTasks[0].id);
    });
  });
});
