import { ApiProperty } from "@nestjs/swagger";

export class CreateInventoryItemDto {
    @ApiProperty()
    itemId: number;
    @ApiProperty()
    inventoryId: number;
    @ApiProperty()
    quantity: number;
}
