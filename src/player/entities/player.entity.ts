import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Inventory } from '../../inventory/entities/inventory.entity';
import { Stat } from '../../stats/entities/stat.entity'
import { EquippedItem } from '../../equipped-item/entities/equipped-item.entity';
import { User } from '../../user/entities/user.entity';
import { PlayerSkill } from '../../player-skills/entities/player-skill.entity';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * The last time the player was online
     */
    @Column({ type: 'timestamp', nullable: true})
    lastOnline: Date

    /**
     * Latest Activity player was performing
     */
    @Column({ type: 'int', nullable: true })
    lastActivity: number

    @Column()
    characterName: string;

    /**
     * Players level. Higher level players are stronger and can access more content
     */
    @Column({ default: 1 })
    level: number;

    /**
     * Players experience points. Players gain experience points by completing tasks
     */
    @Column({ default: 0 })
    experience: number;

    /**
     * Players gold. Players can use gold to purchase items
     */
    @Column({ default: 0 })
    gold: number


    @OneToOne(() => Inventory, inventory => inventory.player, { cascade: true })
    @JoinColumn()
    inventory: Inventory;

    @OneToOne(() => Stat, stats => stats.player)
    @JoinColumn()
    stats: Stat;

    @OneToMany(() => EquippedItem, equippedItem => equippedItem.player)
    equippedItems: EquippedItem[];

    @ManyToOne(() => User, user => user.players)
    user: User;

    @OneToMany(() => PlayerSkill, playerSkill => playerSkill.player)
    skills: PlayerSkill;
}
