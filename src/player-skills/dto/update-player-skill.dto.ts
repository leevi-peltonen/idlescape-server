import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerSkillDto } from './create-player-skill.dto';

export class UpdatePlayerSkillDto extends PartialType(CreatePlayerSkillDto) {}
