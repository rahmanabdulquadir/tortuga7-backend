import { Test, TestingModule } from '@nestjs/testing';
import { SpecService } from './spec.service';

describe('SpecService', () => {
  let service: SpecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecService],
    }).compile();

    service = module.get<SpecService>(SpecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
