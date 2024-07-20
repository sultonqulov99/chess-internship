import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose"

export type RegisterDocument = Register & Document

@Schema({collection:'users'})
export class Register {

    @Prop()
    username:string

    @Prop()
    age:number 

    @Prop()
    country:string 

    @Prop()
    password:string 

    @Prop({default:"USER"})
    role:string 

}

export const RegisterSchema = SchemaFactory.createForClass(Register)