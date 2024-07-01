import { Module } from '@nestjs/common';
import { PlayerSkillsService } from './player-skills.service';
import { PlayerSkillsController } from './player-skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/player/entities/player.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { PlayerSkill } from './entities/player-skill.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerSkill, Player, Skill]),
    ],
    controllers: [PlayerSkillsController],
    providers: [PlayerSkillsService],
})
export class PlayerSkillsModule {}
