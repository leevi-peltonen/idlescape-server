import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquippedItemService } from './equipped-item.service';
import { CreateEquippedItemDto } from './dto/create-equipped-item.dto';
import { UpdateEquippedItemDto } from './dto/update-equipped-item.dto';

@Controller('equipped-item')
export class EquippedItemController {
  constructor(private readonly equippedItemService: EquippedItemService) {}

  @Post()
  create(@Body() createEquippedItemDto: CreateEquippedItemDto) {
    return this.equippedItemService.create(createEquippedItemDto);
  }

  @Get()
  findAll() {
    return this.equippedItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equippedItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquippedItemDto: UpdateEquippedItemDto) {
    return this.equippedItemService.update(+id, updateEquippedItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equippedItemService.remove(+id);
  }
}
