import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose"

export type TournamentDocument = Tournament & Document

@Schema({collection:'tournaments'})
export class Tournament {

    @Prop()
    name:string

    @Prop()
    start_date: string

    @Prop()
    end_date : string
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament)