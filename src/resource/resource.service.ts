import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { ALL_RESOURCES_DEV } from 'src/data/resources';
import { Item } from '../item/entities/item.entity';

@Injectable()
export class ResourceService {
    constructor(
        @InjectRepository(Resource) 
        private readonly resourceRepository: Repository<Resource>,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
    ) {}

    /**
     * Service for initializing resources in the database
     */
    async initialize() {
        const resources = await this.findAll();
        if (resources.length === ALL_RESOURCES_DEV.length) {
            return { message: 'Resources already initialized', success: false }
        }
        this.resourceRepository.save(ALL_RESOURCES_DEV);
        return { message: 'Resources initialized', success: true }
    }

    async findAll() {
        return this.resourceRepository.find();
    }

    async findAllBySkillId(id: number): Promise<Resource[]> {
        return this.resourceRepository.find({
            where: { skillId: id },
            relations: ['items'],
            order: { id: 'ASC'}
        });
    }

    async getItemsByResource(resourceId: number): Promise<Item[]> {
        return this.itemRepository.createQueryBuilder('item')
            .innerJoin('item.resources', 'resource', 'resource.id = :resourceId', { resourceId })
            .getMany();
    }
}
