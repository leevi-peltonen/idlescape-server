import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Player } from '../../player/entities/player.entity';

@Entity()
export class Stat {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * The player that these stats belong to
     */
    @OneToOne(() => Player)
    @JoinColumn()
    player: Player;

    /**
     * Player health. When this reaches 0, the player dies
     */
    @Column()
    health: number;
}
