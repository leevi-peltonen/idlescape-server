import { ApiProperty } from "@nestjs/swagger";

export class UpdateSlotsDto {
    @ApiProperty()
    inventoryItemId: number
    @ApiProperty()
    slot: number
    @ApiProperty()
    inventoryId: number
}