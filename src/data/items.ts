import { CreateItemDto } from "src/item/dto/create-item.dto";
import { ItemType } from "src/item/entities/item.entity";

export const ALL_ITEMS_DEV: CreateItemDto[] = [
    {
        name: "Sword",
        description: "A sword",
        type: ItemType.Weapon,
        value: 10,
        stackable: false
    },
    {
        name: "Shield",
        description: "A shield",
        type: ItemType.Armor,
        value: 10,
        stackable: false
    },
    {
        name: "Potion",
        description: "A potion",
        type: ItemType.Consumable,
        value: 5,
        stackable: true
    },
    {
        name: "Coin",
        description: "A coin",
        type: ItemType.Misc,
        value: 1,
        stackable: true
    }
]