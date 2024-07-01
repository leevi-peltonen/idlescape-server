import { ItemType } from "../entities/item.entity"

export class CreateItemDto {
    name: string
    description: string
    type: ItemType
    value: number
    stackable: boolean
}
