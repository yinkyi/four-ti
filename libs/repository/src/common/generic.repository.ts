import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginatedResult } from 'libs/repository/prisma/paginate.interface';
import { PrismaService } from '@app/repository/prisma/prisma.service';

@Injectable()
export class GenericRepository<
  M,
  WhereUniqueInput,
  WhereInput,
  OrderByWithRelationInput,
  RelationsInclude,
  CreateModel extends Partial<M> = Partial<M>,
  UpdateModel extends Partial<M> = Partial<M>,
> {
  protected loadRelations: RelationsInclude;
  constructor(
    protected prismaClient: PrismaService,
    protected model: Prisma.ModelName,
  ) {}

  async create(createData: CreateModel): Promise<M> {
    return await this.prismaClient.client[this.model].create({
      data: {
        ...createData,
      },
    });
  }

  async update(id: string, updateData: UpdateModel): Promise<M> {
    return await this.prismaClient.client[this.model].update({
      where: {
        id: id,
      },
      data: {
        ...updateData,
      },
    });
  }

  async findUnique(where: WhereUniqueInput): Promise<M> {
    try {
      return await this.prismaClient.client[this.model].findUniqueOrThrow({
        where: {
          ...where,
        },
        include: this.loadRelations,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException(`record not found`);
    }
  }

  async remove(id: string): Promise<M> {
    const result = await this.prismaClient.client[this.model].findUnique({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return this.prismaClient.client[this.model].delete({ id });
  }

  async paginate(
    page: number = 1,
    limit: number = 20,
    where?: WhereInput,
    orderBy?: OrderByWithRelationInput,
  ): Promise<PaginatedResult<M>> {
    const skip = (page - 1) * limit;

    // Get the total count of items based on the given conditions
    const totalItems = await this.prismaClient.client[this.model].count({
      where,
    });

    // Fetch the paginated records
    const items = await this.prismaClient.client[this.model].findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: this.loadRelations,
    });

    const totalPages = Math.ceil(totalItems / limit);

    const meta = {
      totalItems,
      itemCount: items.length,
      itemsPerPage: limit,
      totalPages,
      currentPage: page,
    };

    const links = {
      first: `?page=1&limit=${limit}`,
      previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
      next: page < totalPages ? `?page=${page + 1}&limit=${limit}` : null,
      last: `?page=${totalPages}&limit=${limit}`,
    };

    return { items, meta, links };
  }
}
