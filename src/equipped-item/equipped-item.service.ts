import { Injectable } from '@nestjs/common';
import { CreateEquippedItemDto } from './dto/create-equipped-item.dto';
import { UpdateEquippedItemDto } from './dto/update-equipped-item.dto';

@Injectable()
export class EquippedItemService {
  create(createEquippedItemDto: CreateEquippedItemDto) {
    return 'This action adds a new equippedItem';
  }

  findAll() {
    return `This action returns all equippedItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equippedItem`;
  }

  update(id: number, updateEquippedItemDto: UpdateEquippedItemDto) {
    return `This action updates a #${id} equippedItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} equippedItem`;
  }
}
