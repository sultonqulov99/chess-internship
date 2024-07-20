import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose"

export type UserDocument = User & Document

@Schema({collection:'users'})
export class User {

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

    @Prop({default:null})
    tournamentsId: string

    @Prop({ default: 0 })
    points: number;

    @Prop({ type: [String], default: [] })
    opponents: string[];

}

export const UserSchema = SchemaFactory.createForClass(User)