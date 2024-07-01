import { ApiProperty } from "@nestjs/swagger";

export class SellItemDto {
    @ApiProperty()
    inventoryItemId: number;
    @ApiProperty()
    quantity: number;
}