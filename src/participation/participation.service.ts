import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParticipationDto } from './dto/participation.dto';
import { Participation, ParticipationDocument } from './schema/participation.schema';
@Injectable()
export class ParticipationService {
    constructor(@InjectModel(Participation.name) private participationModel : Model<ParticipationDocument>){}

    async createParticipation(payload : ParticipationDto){
        
        const existParticipation = await this.participationModel.findOne({$and:[{userId : payload.userId},{tournamentId : payload.tournamentId}]})

        if(existParticipation){
            throw new HttpException("Participant already exists",HttpStatus.BAD_REQUEST)
        }
        let create =new this.participationModel({
            ...payload,
            createdAt: new Date()
        })
        return await create.save()
    }
}
