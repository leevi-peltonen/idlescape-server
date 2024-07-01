import { Test, TestingModule } from '@nestjs/testing';
import { ResourceItemsService } from './resource-items.service';

describe('ResourceItemsService', () => {
  let service: ResourceItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceItemsService],
    }).compile();

    service = module.get<ResourceItemsService>(ResourceItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
