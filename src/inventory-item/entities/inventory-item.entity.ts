import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Inventory } from '../../inventory/entities/inventory.entity'; // An entity representing the inventory
import { Item } from '../../item/entities/item.entity'; // An entity representing the item



@Entity()
export class InventoryItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Inventory, inventory => inventory.items)
    inventory: Inventory;

    @ManyToOne(() => Item)
    item: Item;

    @Column()
    quantity: number;

    @Column({ default: 0 })
    slot: number;
}


