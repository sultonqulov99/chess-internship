import { ApiProperty } from "@nestjs/swagger"
import { IsAlpha,IsNotEmpty,MinLength} from "class-validator"

export class UserDto {
    @ApiProperty({example:"Abduhoshim"})
    @IsNotEmpty()
    readonly username:string

    @ApiProperty({example:24})
    @IsNotEmpty()
    readonly age:number

    @ApiProperty({example:"Uzbekistan"})
    @IsNotEmpty()
    readonly country:string 

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    readonly password : string

    readonly role : string

    readonly rating : number

    readonly tournament_id : string
}
