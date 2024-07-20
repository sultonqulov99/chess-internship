import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose"

export type PairingDocument = Pairing & Document

@Schema({collection:'pairings'})
export class Pairing {

    @Prop({ required: true })
    tournamentId: string;

    @Prop({default: 1})
    numberOfRounds: number;
  
    @Prop({
        type: [{ round: Number, pairs: [{ p1: String, p2: String }] }],
        default: [],
    })
    rounds: { round: number; pairs: { p1: string; p2: string | null }[] }[];
}

export const PairingSchema = SchemaFactory.createForClass(Pairing)