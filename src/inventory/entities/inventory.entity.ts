import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Column, OneToOne } from 'typeorm';

import { InventoryItem } from '../../inventory-item/entities/inventory-item.entity'
import { Player } from '../../player/entities/player.entity'

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Player, player => player.inventory)
    @JoinColumn()
    player: Player

    @OneToMany(() => InventoryItem, inventoryItem => inventoryItem.inventory, { nullable: true})
    items: InventoryItem[]

    /**
     * The number of rows in the bank
     */
    @Column({ default: 5 })
    size: number
}
