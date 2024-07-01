import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceItemsService } from './resource-items.service';
import { CreateResourceItemDto } from './dto/create-resource-item.dto';
import { UpdateResourceItemDto } from './dto/update-resource-item.dto';

@Controller('resource-items')
export class ResourceItemsController {
    constructor(private readonly resourceItemsService: ResourceItemsService) {}

    @Post()
    create(@Body() createResourceItemDto: CreateResourceItemDto) {
        console.log('createResourceItemDto', createResourceItemDto)
        return this.resourceItemsService.connectItemToResource(createResourceItemDto);
    }
}
