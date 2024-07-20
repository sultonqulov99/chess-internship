import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class ParticipationDto {
    @ApiProperty()
    @IsNotEmpty()
    userId:string

    @ApiProperty()
    @IsNotEmpty()
    tournamentId:string

}
