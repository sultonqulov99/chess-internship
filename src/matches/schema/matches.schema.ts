import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose"

export type MatchDocument = Match & Document

@Schema({collection:'matches'})
export class Match {


    @Prop({ required: true })
    tournamentId: string;

    @Prop({ required: true })
    round: number;
  
    @Prop()
    player1Id: string

    @Prop()
    player2Id: string

    @Prop()
    player1Score: number

    @Prop()
    player2Score:number
}

export const MatchSchema = SchemaFactory.createForClass(Match)