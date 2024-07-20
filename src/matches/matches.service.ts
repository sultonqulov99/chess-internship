import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tournament, TournamentDocument } from 'src/tournament/schema/tournament.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { MatchesDto } from './dto/matches.dto';
import { Match, MatchDocument } from './schema/matches.schema';

@Injectable()
export class MatchesService {
    constructor(
        @InjectModel(Match.name) private matchModel : Model<MatchDocument>,
        @InjectModel(User.name) private userModel : Model<UserDocument>,
        ){}

    async getUserRankings(id : string){
        return this.userModel.find({tournamentId: { $in: [id] }}).sort({ points: -1 }).exec();
    }

    async createMatches(payload : MatchesDto) {
        let existMatch = await this.matchModel.findOne({$and : [{tournamentId: payload.tournamentId},{player1Id: payload.player1Id},{player2Id: payload.player2Id}]}).exec()

        if(existMatch){
            throw new HttpException("Participant already exists",HttpStatus.BAD_REQUEST)
        }

        let create = new this.matchModel(payload)
        let match =  await create.save()

        await this.userModel.findByIdAndUpdate(create.player1Id, { $inc: { points: create.player1Score },$addToSet: { tournamentId: create.tournamentId } });
        await this.userModel.findByIdAndUpdate(create.player2Id, { $inc: { points: create.player2Score },$addToSet: { tournamentId: create.tournamentId } });
        return match
    }
}
