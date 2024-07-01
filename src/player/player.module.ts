import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerGateway } from './player.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { User } from '../user/entities/user.entity'
import { Inventory } from '../inventory/entities/inventory.entity'
import { InventoryItem } from '../inventory-item/entities/inventory-item.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([Player, User, Inventory, InventoryItem]),
    ],
    controllers: [PlayerController],
    providers: [PlayerService, PlayerGateway],
})
export class PlayerModule {}
