import { Item } from "src/item/entities/item.entity";
import { Resource } from "src/resource/entities/resource.entity";

export class CreateResourceItemDto {
    resourceId: number

    itemIds: number[]
}
