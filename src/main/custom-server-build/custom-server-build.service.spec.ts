import { Test, TestingModule } from '@nestjs/testing';
import { CustomServerBuildService } from './custom-server-build.service';

describe('CustomServerBuildService', () => {
  let service: CustomServerBuildService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomServerBuildService],
    }).compile();

    service = module.get<CustomServerBuildService>(CustomServerBuildService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
