import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class MatchesDto {
   
    @ApiProperty()
    @IsNotEmpty()
    tournamentId:string

    @ApiProperty({example:1})
    @IsNotEmpty()
    round: number;

    @ApiProperty()
    @IsNotEmpty()
    player1Id: string;

    @ApiProperty()
    @IsNotEmpty()
    player2Id: string;

    @ApiProperty({example:0})
    @IsNotEmpty()
    player1Score: number;

    @ApiProperty({example:1})
    @IsNotEmpty()
    player2Score: number;

}
