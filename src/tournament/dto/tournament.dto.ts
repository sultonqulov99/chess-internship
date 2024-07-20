import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class TournamentDto {
    @ApiProperty({example:"chees_07"})
    @IsNotEmpty()
    name:string

    @ApiProperty({example:'12:00'})
    @IsNotEmpty()
    start_date:string

    @ApiProperty({example:"18:00"})
    @IsNotEmpty()
    end_date:string 
}
