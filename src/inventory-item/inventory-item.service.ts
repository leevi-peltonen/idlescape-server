import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryItem } from './entities/inventory-item.entity';
import { Repository } from 'typeorm';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { Item } from '../item/entities/item.entity'
import { Inventory } from '../inventory/entities/inventory.entity';
import { Player } from '../player/entities/player.entity'
import { UpdateSlotsDto } from './dto/update-slots.dto';
import { of } from 'rxjs';


@Injectable()
export class InventoryItemService {

    constructor(
        @InjectRepository(InventoryItem)
        private readonly inventoryItemRepository: Repository<InventoryItem>,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>
    ) {}

    /**
     * Add an item to an inventory
     * @param createInventoryItemDto
     * @returns 
     */
    async addItemToInventory(createInventoryItemDto: CreateInventoryItemDto) {
        

        const existingInventoryItem = await this.inventoryItemRepository.findOneBy({
            inventory: { id: createInventoryItemDto.inventoryId },
            item: { id: createInventoryItemDto.itemId }
        });

        // TODO: Add stackable check also "&& existingInventoryItem.item.stackable" 
        if (existingInventoryItem) {
            existingInventoryItem.quantity += createInventoryItemDto.quantity;
            await this.inventoryItemRepository.save(existingInventoryItem);
            return this.inventoryItemRepository.find({ where: { inventory: { id: createInventoryItemDto.inventoryId } }, relations: ['item']});
        }

        const inventory = await this.inventoryRepository.findOneBy({ id: createInventoryItemDto.inventoryId });
        const item = await this.itemRepository.findOneBy({ id: createInventoryItemDto.itemId });

        const freeSlotIndex = this.findFirstFreeSlot(inventory.size, (await this.getItemsByInventoryId(inventory.id)).map(item => item.slot));

        if (freeSlotIndex === null) {
            throw new Error('Inventory is full');
        }

        const inventoryItem = this.inventoryItemRepository.create(createInventoryItemDto);
        await this.inventoryItemRepository.save(inventoryItem);



        inventoryItem.slot = freeSlotIndex;
        inventoryItem.inventory = inventory;
        inventoryItem.item = item;
        await this.inventoryItemRepository.save(inventoryItem);
        return this.inventoryItemRepository.find({ where: { inventory: { id: createInventoryItemDto.inventoryId } }, relations: ['item']});
    }

    /**
     * Remove an item from an inventory
     * @param inventoryId 
     * @param itemId 
     * @param quantity 
     * @returns 
     */
    removeItemFromInventory(inventoryId: number, itemId: number, quantity: number) {
        return this.inventoryItemRepository.delete({
            inventory: { id: inventoryId },
            item: { id: itemId },
            quantity
        });
    }

    /**
     * Sell an item from an inventory
     * @param inventoryItemId 
     * @param quantity 
     * @returns 
     */
    async sellItem(inventoryItemId: number, quantity: number) {
        const unitValue = await this.inventoryItemRepository.findOne({where: { id: inventoryItemId }, relations: ['item']})
        const newQuantity = unitValue.quantity - quantity;
        const inventoryId = (await this.inventoryItemRepository.findOne({where: {id: inventoryItemId}, relations: ['inventory']})).inventory.id
        const playerId = (await this.inventoryRepository.findOne({where: {id: inventoryId}, relations: ['player']})).player.id
        const player = await this.playerRepository.findOneBy({id: playerId})

        player.gold += unitValue.item.value * quantity;
        await this.playerRepository.save(player);

        if (newQuantity <= 0) {
            await this.inventoryItemRepository.delete({ id: inventoryItemId });
            return { inventory: await this.inventoryItemRepository.find({ where: { inventory: { id: inventoryId } }, relations: ['item']}), gold: player.gold}
        }
        await this.inventoryItemRepository.update({ id: inventoryItemId }, { quantity: newQuantity });
        return { inventory: await this.inventoryItemRepository.find({ where: { inventory: { id: inventoryId } }, relations: ['item']}), gold: player.gold}
    }

    /**
     * Get all items in an inventory
     * @param inventoryId 
     * @returns 
     */
    getItemsByInventoryId(inventoryId: number) {
        return this.inventoryItemRepository.find({ where: { inventory: { id: inventoryId } }, relations: ['item']});
    }

    /**
     * Update the slot of an inventory item
     * @param updatedSlot 
     * @returns 
     */
    updateSlot(updatedSlot: { id: number, slot: number}) {
        return this.inventoryItemRepository.update({ id: updatedSlot.id }, { slot: updatedSlot.slot });
    }

    /**
     * Update the slots of multiple inventory items
     * @param updatedSlots
     * @returns 
     */
    async updateSlots(updatedSlots: UpdateSlotsDto[]) {
        
        for (let updatedSlot of updatedSlots) {
            if (updatedSlot.inventoryItemId === 0) {
                continue
            }
            await this.inventoryItemRepository.update({ id: updatedSlot.inventoryItemId }, { slot: updatedSlot.slot });
        }


        const inventory = await this.inventoryRepository.findOneBy({ id: updatedSlots[0].inventoryId });

        return this.inventoryItemRepository.find({ where: { inventory: inventory }, relations: ['item']})
    }

    /**
     * Finds the first free slot in an inventory
     * @param inventorySize 
     * @param occupiedSlots 
     * @returns 
     */
    private findFirstFreeSlot(inventorySize: number, occupiedSlots: number[]): number | null {
        let allSlots = new Set<number>()
        for (let i = 0; i < inventorySize; i++) {
            allSlots.add(i);
        }

        let usedSlots = new Set(occupiedSlots)
        let freeSlots = new Set([...allSlots].filter(x => !usedSlots.has(x)))

        if (freeSlots.size === 0) {
            return null
        }
        return Math.min(...freeSlots)
    }
}
