import { PlayerSkill } from "../../player-skills/entities/player-skill.entity";
import { Resource } from "../../resource/entities/resource.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Skill {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 20 })
    name: string

    @OneToMany(() => PlayerSkill, playerSkill => playerSkill.skill)
    playerSkills: PlayerSkill[]

    @OneToMany(() => Resource, resource => resource.skillId)
    resources: Resource[]
}
