import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { ALL_ITEMS_DEV } from 'src/data/items';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
    ) {}

    getAll() {
        return this.itemRepository.find();
    }

    create(createItemDto: CreateItemDto) {
        return this.itemRepository.save(createItemDto);
    }

    createMany(createItemDtos: CreateItemDto[]) {
        return this.itemRepository.save(createItemDtos);
    }

    async init() {
        const items = await this.itemRepository.find()
        if (items.length > 0) {
            return items
        }
        return this.itemRepository.save(ALL_ITEMS_DEV)
    }
}
