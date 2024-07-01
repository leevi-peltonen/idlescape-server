import { Test, TestingModule } from '@nestjs/testing';
import { ResourceItemsController } from './resource-items.controller';
import { ResourceItemsService } from './resource-items.service';

describe('ResourceItemsController', () => {
  let controller: ResourceItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceItemsController],
      providers: [ResourceItemsService],
    }).compile();

    controller = module.get<ResourceItemsController>(ResourceItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
