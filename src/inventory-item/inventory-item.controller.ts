import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryItemService } from './inventory-item.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { SellItemDto } from './dto/sell-item.dto';
import { InventoryItem } from './entities/inventory-item.entity';
import { UpdateSlotsDto } from './dto/update-slots.dto';


@Controller('inventory-item')
export class InventoryItemController {
  constructor(private readonly inventoryItemService: InventoryItemService) {}

    @Post()
    addItemToInventory(@Body() createInventoryItemDto: CreateInventoryItemDto) {
        return this.inventoryItemService.addItemToInventory(createInventoryItemDto);
    }

    @Get('/:inventoryId')
    getItemsByInventoryId(@Param('inventoryId') inventoryId: number) {
        return this.inventoryItemService.getItemsByInventoryId(inventoryId);
    }

    @Post('update-slot')
    updateSlot(@Body() updatedSlot: { id: number, slot: number}) {
        return this.inventoryItemService.updateSlot(updatedSlot);
    }

    @Post('update-slots')
    updateSlots(@Body() updatedSlots: UpdateSlotsDto[]) {
        return this.inventoryItemService.updateSlots(updatedSlots);
    }

    @Post('sell')
    sellItem(@Body() sellItem: SellItemDto): Promise<{inventory: InventoryItem[], gold: number}> {
        return this.inventoryItemService.sellItem(sellItem.inventoryItemId, sellItem.quantity);
    }
}