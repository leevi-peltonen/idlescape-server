import { Test, TestingModule } from '@nestjs/testing';
import { PlayerSkillsService } from './player-skills.service';

describe('PlayerSkillsService', () => {
  let service: PlayerSkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerSkillsService],
    }).compile();

    service = module.get<PlayerSkillsService>(PlayerSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
