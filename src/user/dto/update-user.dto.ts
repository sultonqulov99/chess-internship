import { ApiProperty } from "@nestjs/swagger"
import { IsNumber,IsOptional } from "class-validator"

export class UserUpdateDto {
    @ApiProperty()
    userId:string

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    username?:string

    @ApiProperty({
        required: false,
    })
    @IsNumber()
    @IsOptional()
    age?:number

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    country?:string  

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    @IsNumber()
    rating? : number

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    tournament_id? : string
}
