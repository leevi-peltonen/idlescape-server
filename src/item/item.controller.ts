import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post()
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemService.create(createItemDto);
    }

    @Post('many')
    createMany(@Body() createItemDtos: CreateItemDto[]) {
        return this.itemService.createMany(createItemDtos);
    }

    @Get('init')
    init() {
        return this.itemService.init();
    }

    @Get()
    getAll() {
        return this.itemService.getAll();
    }
}
