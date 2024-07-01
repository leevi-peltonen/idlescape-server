import { Injectable } from '@nestjs/common';
import { CreateResourceItemDto } from './dto/create-resource-item.dto';
import { UpdateResourceItemDto } from './dto/update-resource-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceItem } from './entities/resource-item.entity';
import { In, Repository } from 'typeorm';
import { Resource } from '../resource/entities/resource.entity';
import { Item } from '../item/entities/item.entity';

@Injectable()
export class ResourceItemsService {
    constructor(

        @InjectRepository(ResourceItem)
        private resourceItemRepository: Repository<ResourceItem>,
        @InjectRepository(Resource)
        private resourceRepository: Repository<Resource>,
        @InjectRepository(Item)
        private itemRepository: Repository<Item>
    ) {}
    
    async connectItemToResource(createResourceItemDto: CreateResourceItemDto) {
        const { resourceId, itemIds } = createResourceItemDto;
        const resource = await this.resourceRepository.findOneBy({id: resourceId});
        if(!resource) {
            throw new Error('Resource not found');
        }

        const items = await this.itemRepository.findBy({ id: In(itemIds) }); ;
        if(items.length !== itemIds.length) {
            throw new Error('One or more items not found');
        }

        for (const item of items) {
            const resourceItem = new ResourceItem();
            resourceItem.item = item;
            resourceItem.resource = resource;
            await this.resourceItemRepository.save(resourceItem);
        }

        return { message: 'Items connected to resource', success: true };
    }
}
