import { Injectable } from '@nestjs/common';
import { Inventory } from './entities/inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
    ) {}

    create(playerId: number) {
        return this.inventoryRepository.save({ player: { id: playerId } });
    }

    getInventory(playerId: number) {
        return this.inventoryRepository.findOneBy({ player: { id: playerId } });
    }
    
}
