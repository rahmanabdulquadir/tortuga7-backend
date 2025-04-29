import { Test, TestingModule } from '@nestjs/testing';
import { SpecController } from './spec.controller';

describe('SpecController', () => {
  let controller: SpecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecController],
    }).compile();

    controller = module.get<SpecController>(SpecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
