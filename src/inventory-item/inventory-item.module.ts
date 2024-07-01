import { Module } from '@nestjs/common';
import { InventoryItemService } from './inventory-item.service';
import { InventoryItemController } from './inventory-item.controller';
import { InventoryItem } from './entities/inventory-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Item } from '../item/entities/item.entity';
import { Player } from '../player/entities/player.entity';

@Module({
    imports: [TypeOrmModule.forFeature([InventoryItem, Inventory, Item, Player])],
    controllers: [InventoryItemController],
    providers: [InventoryItemService],
})
export class InventoryItemModule {}
