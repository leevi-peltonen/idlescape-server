
import { Player } from '../../player/entities/player.entity';

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 20, unique: true })
    username: string

    @Column({ type: 'varchar' })
    password: string

    @OneToMany(() => Player, player => player.user)
    players: Player[]

    @OneToOne(() => Player, player => player.user)
    activePlayer: Player
}
