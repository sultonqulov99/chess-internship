import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Types } from "mongoose"
import { User } from "src/user/schema/user.schema";

export type ParticipationDocument = Participation & Document

@Schema({collection:'participations'})

export class Participation {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({type: Types.ObjectId, ref: 'Tournament', required: true})
    tournamentId: Types.ObjectId

    @Prop()
    createdAt: Date

}

export const ParticipationSchema = SchemaFactory.createForClass(Participation)