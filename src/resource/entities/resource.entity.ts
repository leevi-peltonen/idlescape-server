
import { Item } from '../../item/entities/item.entity'
import { Skill } from '../../skill/entities/skill.entity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 20 })
    name: string

    @Column({ type: 'int', default: 1 })
    gatherAmount: number

    @Column({ type: 'int', default: 2000 })
    gatherTime: number

    @ManyToOne(() => Skill, skill => skill.resources)
    @JoinColumn({ name: 'skillId' })
    skill: Skill

    @Column({ type: 'int' })
    skillId: number
    
    @Column({ type: 'int', default: 1})
    tier: number

    @Column({ type: 'int', default: 1})
    levelRequirement: number

    @Column({ type: 'int', default: 1})
    experience: number

    @ManyToMany(() => Item, item => item.resources)
    @JoinTable({
        name: 'resource_item',
        joinColumn: { name: 'resourceId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'itemId', referencedColumnName: 'id' }
    })
    items: Item[]
}
