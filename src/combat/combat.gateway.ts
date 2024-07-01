import { WebSocketGateway } from '@nestjs/websockets';
import { CombatService } from './combat.service';

@WebSocketGateway()
export class CombatGateway {
  constructor(private readonly combatService: CombatService) {}
}
