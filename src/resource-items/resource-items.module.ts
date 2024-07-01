import { Module } from '@nestjs/common';
import { ResourceItemsService } from './resource-items.service';
import { ResourceItemsController } from './resource-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceItem } from './entities/resource-item.entity';
import { Resource } from '../resource/entities/resource.entity';
import { Item } from '../item/entities/item.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ResourceItem, Resource, Item]),
    ],
    controllers: [ResourceItemsController],
    providers: [ResourceItemsService],
})
export class ResourceItemsModule {}
