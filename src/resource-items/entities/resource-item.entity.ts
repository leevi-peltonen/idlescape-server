import { Item } from '../../item/entities/item.entity';
import { Resource } from '../../resource/entities/resource.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResourceItem {
    @PrimaryColumn()
    resourceId: number

    @PrimaryColumn()
    itemId: number

    @ManyToOne(() => Resource)
    @JoinColumn({ name: 'resourceId' })
    resource: Resource

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'itemId' })
    item: Item
}
