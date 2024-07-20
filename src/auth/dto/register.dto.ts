import { ApiProperty } from "@nestjs/swagger"
import { IsAlpha,IsNotEmpty,MinLength} from "class-validator"

export class RegisterDto {
    @ApiProperty({example:"Abduhoshim"})
    @IsAlpha()
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
}
