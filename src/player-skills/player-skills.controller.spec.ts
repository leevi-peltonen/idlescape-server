import { Test, TestingModule } from '@nestjs/testing';
import { PlayerSkillsController } from './player-skills.controller';
import { PlayerSkillsService } from './player-skills.service';

describe('PlayerSkillsController', () => {
  let controller: PlayerSkillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerSkillsController],
      providers: [PlayerSkillsService],
    }).compile();

    controller = module.get<PlayerSkillsController>(PlayerSkillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
