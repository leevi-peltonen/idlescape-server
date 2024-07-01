import { Resource } from '../../resource/entities/resource.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

export enum ItemType {
    Consumable = 'Consumable',
    Weapon = 'Weapon',
    Armor = 'Armor',
    Accessory = 'Accessory',
    Material = 'Material',
    Misc = 'Misc'
}

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number

    /**
     * The name of the item. This is how the item will be displayed in the game
     */
    @Column()
    name: string

    /**
     * The type of item. This determines how the item can be used and what bonuses it provides
     */
    @Column()
    type: ItemType

    /**
     * A description of the item. This is a brief overview of what the item does
     */
    @Column()
    description: string
    /**
     * The value of the item. This is how much the item can be sold for
     */
    @Column()
    value: number

    /**
     * If multiple items can be stacked in the same inventory slot
     */
    @Column({ default: false })
    stackable: boolean

    /**
     * The level required to use the item
     */
    @Column({ nullable: true })
    levelRequirement: number

    /**
     * The base damage of the item. Only applies to weapons
     */
    @Column({ nullable: true })
    baseDamage: number

    /**
     * The amount of health the item restores when used. Only applies to consumable items
     */
    @Column({ nullable: true })   
    healingAmount: number

    /**
     * Gives player more attack power. Higher attack means higher chance to hit
     */
    @Column({ nullable: true })
    attackBonus: number

    /**
     * Increases the player's critical strike chance by this amount. Critical strikes deal increased damage
     */
    @Column({ nullable: true })
    criticalChanceBonus: number

    /**
     * Increases the player's critical strike damage by this amount
     */
    @Column({ nullable: true })
    criticalDamageBonus: number

    /**
     * Increases the player's penetration chance by this amount. Penetration chance increases the chance to bypass enemy armor
     */
    @Column({ nullable: true })
    penetrationBonus: number

    /**
     * Increases the player's dodge chance by this amount. Dodge chance reduces the chance of being hit
     */
    @Column({ nullable: true })
    dodgeChanceBonus: number

    /**
     * Increases the player's health by this amount
     */
    @Column({ nullable: true })
    healthBonus: number

    /**
     *  Increases the player's armor by this amount. Armor reduces the amount of damage taken
     */
    @Column({ nullable: true })
    armorBonus: number

    @ManyToMany(() => Resource, resource => resource.items)
    resources: Resource[]
} 
