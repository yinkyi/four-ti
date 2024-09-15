import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoRepository } from '@app/repository/todo/todo.repository';
import { Todo } from '@prisma/client';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodoDto } from 'apps/todo-app/src/api/todo/dto/get-todo.dto';

describe('TodoService', () => {
  let repository: TodoRepository;
  let service: TodoService;

  const createDto: CreateTodoDto = {
    title: 'Test Todo',
    content: 'Test Content',
    userId: '1ac1700d-6634-458a-9ea5-d91d8f9703ce',
  };
  const mockTodos: Todo[] = [
    {
      id: 'c6e1796b-2ef2-4544-9b31-f77d35af260d',
      title: 'Test Todo1',
      content: 'Test Content',
      userId: '1ac1700d-6634-458a-9ea5-d91d8f9703ce',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 'c6e1796b-2ef2-4544-9b31-f77d35af260c',
      title: 'Test Todo2',
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
          provide: TodoRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(createDto),
            paginate: jest.fn().mockResolvedValueOnce({
              items: mockTodos,
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
                  mockTodos.find((todo) => todo.id === where.id),
                );
              }),
            updateToDo: jest
              .fn()
              .mockImplementationOnce(
                (id: string, updateDto: UpdateTodoDto) => {
                  return Promise.resolve({
                    ...mockTodos[0],
                    ...updateDto,
                  });
                },
              ),
            remove: jest.fn().mockImplementation((id: string) => {
              return Promise.resolve(mockTodos.find((todo) => todo.id === id));
            }),
          },
        },
        TodoService,
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get(TodoRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  describe('create', () => {
    it('should call create', () => {
      repository.create = jest.fn().mockResolvedValue(createDto);

      return repository.create(createDto).then((returnedM) => {
        expect(returnedM).toEqual(createDto);
      });
    });
  });

  describe('update', () => {
    it('update and should call repository update', async () => {
      const updateMock: UpdateTodoDto = { title: 'update Title' };
      const result = await service.update(mockTodos[0].id, updateMock);
      expect(result).toEqual({
        ...mockTodos[0],
        ...updateMock,
        updatedAt: result.updatedAt,
      });
      expect(repository.updateToDo).toHaveBeenCalledWith(
        mockTodos[0].id,
        updateMock,
      );
    });
  });

  describe('findOne', () => {
    it('should return a Todo object', async () => {
      const result = await service.findOne(mockTodos[0].id);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('completed');
      expect(repository.findUnique).toHaveBeenCalledWith({
        id: mockTodos[0].id,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of Todo objects', async () => {
      const getDto: GetTodoDto = {
        page: 1,
        limit: 10,
        title: 'Test Todo1',
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
      const result = await service.remove(mockTodos[0].id);
      expect(result.id).toEqual(mockTodos[0].id);
      expect(repository.remove).toHaveBeenCalledWith(mockTodos[0].id);
    });
  });
});
