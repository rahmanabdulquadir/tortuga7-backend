import { Test, TestingModule } from '@nestjs/testing';
import { CustomServerBuildController } from './custom-server-build.controller';

describe('CustomServerBuildController', () => {
  let controller: CustomServerBuildController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomServerBuildController],
    }).compile();

    controller = module.get<CustomServerBuildController>(CustomServerBuildController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
