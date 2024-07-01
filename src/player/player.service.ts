import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity'
import { Inventory } from '../inventory/entities/inventory.entity'
import { InventoryItem } from '../inventory-item/entities/inventory-item.entity'

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,

        @InjectRepository(InventoryItem)
        private readonly inventoryItemRepository: Repository<InventoryItem>
    ) {}


    /**
     * Create a new player for the user
     * @param createPlayerDto 
     * @returns Created player
     */
    async create(createPlayerDto: CreatePlayerDto) {
        const user = await this.userRepository.findOneBy({ id: createPlayerDto.userId })
        if(!user) throw new Error('User not found')

        let player = this.playerRepository.create(createPlayerDto)
        player.user = user
        player = await this.playerRepository.save(player)

        const inventory = this.inventoryRepository.create({ player })
        await this.inventoryRepository.save(inventory)

        player.inventory = inventory

        return this.playerRepository.save(player)
    }

    /**
     *  Find all players for the user
     * @param userId User id to find all players for
     * @returns List of players for the user
     */
    async findAllByUserId(userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId })
        return this.playerRepository.createQueryBuilder('player')
                .leftJoinAndSelect('player.inventory', 'inventory')
                .leftJoinAndSelect('player.stats', 'stats')
                .leftJoinAndSelect('player.equippedItems', 'equippedItems')
                .leftJoinAndSelect('player.skills', 'skills')
                .leftJoinAndSelect('skills.skill', 'skill')
                .leftJoinAndSelect('inventory.items', 'items')
                .leftJoinAndSelect('items.item', 'item')
                .where('player.user.id = :userId', { userId: user.id })
                .getMany()
        //return this.playerRepository.find({ where: { user }, relations: ['inventory', 'stats', 'equippedItems', 'skills' ] })
    }

    /**
     * Get all items for the player
     * @param playerId Player id to get items for
     * @returns List of items for the player
     */
    async getPlayerItems(playerId: number) {
        return this.inventoryItemRepository.find({ where: { inventory: { player: { id: playerId } } }, relations: ['item'] })
    }



}
