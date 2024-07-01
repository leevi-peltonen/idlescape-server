import { Item } from '../../item/entities/item.entity';
import { Player } from '../../player/entities/player.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class EquippedItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Player, player => player.equippedItems)
    player: Player;

    @ManyToOne(() => Item)
    item: Item;
}