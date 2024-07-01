import { Test, TestingModule } from '@nestjs/testing';
import { EquippedItemService } from './equipped-item.service';

describe('EquippedItemService', () => {
  let service: EquippedItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquippedItemService],
    }).compile();

    service = module.get<EquippedItemService>(EquippedItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
