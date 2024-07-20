import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Participation, ParticipationDocument } from 'src/participation/schema/participation.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { TournamentDto } from './dto/tournament.dto';
import { Tournament, TournamentDocument } from './schema/tournament.schema';

@Injectable()
export class TournamentService {
    constructor(
        @InjectModel(Tournament.name) private tournamentModel : Model<TournamentDocument>,
        @InjectModel(Participation.name) private participationModel : Model<ParticipationDocument>,
        @InjectModel(User.name) private userModel : Model<UserDocument>
        ){}

    async createTournament(payload : TournamentDto){
        const create = new this.tournamentModel(payload)

        return await create.save()

    }

    async getTournaments(){
        return this.tournamentModel.find().exec()
    }

    async getTournamentSingle(id : string) {
        const tournament = await this.tournamentModel.findById(id);
        if (!tournament) {
            throw new HttpException("Tournament not found", HttpStatus.NOT_FOUND);
        }
        const participations = await this.participationModel.find({ tournamentId: id })
        .populate('userId') 
        .exec();

    return {
        tournament,
        participants: participations.map(p => p.userId),
    };
    }
}
