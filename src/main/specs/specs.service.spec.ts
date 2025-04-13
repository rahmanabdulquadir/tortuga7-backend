import { Test, TestingModule } from '@nestjs/testing';
import { SpecsService } from './specs.service';

describe('SpecsService', () => {
  let service: SpecsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecsService],
    }).compile();

    service = module.get<SpecsService>(SpecsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
