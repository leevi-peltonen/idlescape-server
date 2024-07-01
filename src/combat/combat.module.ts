import { Module } from '@nestjs/common';
import { CombatService } from './combat.service';
import { CombatGateway } from './combat.gateway';

@Module({
  providers: [CombatGateway, CombatService],
})
export class CombatModule {}
