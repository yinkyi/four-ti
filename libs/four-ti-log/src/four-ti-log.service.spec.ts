import { Test, TestingModule } from '@nestjs/testing';
import { FourTiLogService } from './four-ti-log.service';

describe('FourTiLogService', () => {
  let service: FourTiLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FourTiLogService],
    }).compile();

    service = module.get<FourTiLogService>(FourTiLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
