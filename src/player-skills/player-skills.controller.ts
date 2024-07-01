import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlayerSkillsService } from './player-skills.service';
import { CreatePlayerSkillDto } from './dto/create-player-skill.dto';
import { UpdatePlayerSkillDto } from './dto/update-player-skill.dto';
import { PlayerSkill } from './entities/player-skill.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { GainXpDto } from './dto/gain-xp.dto';

@UseGuards(JwtAuthGuard)
@Controller('player-skills')
export class PlayerSkillsController {
    constructor(private readonly playerSkillsService: PlayerSkillsService) {}

    @Post()
    create(@Body('playerId') playerId: number, @Body('skillId') skillId: number) {
        return this.playerSkillsService.create(playerId, skillId)
    }

    @Get(':playerId')
    findByPlayer(@Param('playerId') playerId: string) {
        return this.playerSkillsService.findByPlayer(+playerId);
    }

    @Post('add-experience')
    addExperienceToSkill(@Body() gainXpDto: GainXpDto) {
        return this.playerSkillsService.addExperienceToSkill(gainXpDto)
    }
}
