import { ApiProperty } from "@nestjs/swagger"

export class GainXpDto {
    @ApiProperty()
    playerId: number
    @ApiProperty()
    skillId: number
    @ApiProperty()
    xp: number
}