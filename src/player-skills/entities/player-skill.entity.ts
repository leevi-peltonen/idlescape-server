import { Player } from "../../player/entities/player.entity";
import { Skill } from "../../skill/entities/skill.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 * Represents a player's skill. Has the data for the player's level and experience in a skill.
 */
@Entity()
export class PlayerSkill {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Player, player => player.skills)
    player: Player;
  
    @ManyToOne(() => Skill, skill => skill.playerSkills)
    skill: Skill;
  
    @Column()
    level: number;
  
    @Column()
    experience: number;
}
