import { Test, TestingModule } from '@nestjs/testing';
import { EquippedItemController } from './equipped-item.controller';
import { EquippedItemService } from './equipped-item.service';

describe('EquippedItemController', () => {
  let controller: EquippedItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquippedItemController],
      providers: [EquippedItemService],
    }).compile();

    controller = module.get<EquippedItemController>(EquippedItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
