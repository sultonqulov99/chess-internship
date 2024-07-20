import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Pairing, PairingDocument } from './schema/pairings.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Participation, ParticipationDocument } from 'src/participation/schema/participation.schema';

@Injectable()
export class PairingsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Participation.name) private participationModel: Model<ParticipationDocument>,
    @InjectModel(Pairing.name) private pairingModel: Model<PairingDocument>
  ) {}

  async getGeneratePairings(tournamentId: string) {
    const participations = await this.participationModel
      .find({ tournamentId })
      .populate('userId', 'username opponents points')
      .exec();
    const players = participations.map((p) => p.userId as User).filter((user) => user !== null);
    const numberOfRounds = Math.ceil(Math.log2(players.length));
  
    const pairingDoc = await this.pairingModel.findOne({ tournamentId }).exec();
    let pairing;
    if (!pairingDoc) {
      pairing = new this.pairingModel({ tournamentId, numberOfRounds, rounds: [] });
    } else {
      pairing = pairingDoc;
    }
  
    if (pairingDoc && (pairingDoc.rounds.length + 1) > numberOfRounds) {
      throw new HttpException("The tournament is over", HttpStatus.BAD_REQUEST);
    }
    const pairs = this.createPairings(players);
    pairing.rounds.push({ round: pairingDoc ? pairingDoc.rounds.length + 1 : 1, pairs });
  
    for (const pair of pairs) {
        await this.userModel.updateOne(
            { username: pair.p1.username },
            { $set: { opponents: pair.p1.opponents } }
          );
          if (pair.p2) {
            await this.userModel.updateOne(
              { username: pair.p2.username },
              { $set: { opponents: pair.p2.opponents } }
            );
          }
    }
  
    return await pairing.save();
  }
  

  private createPairings(players: User[]): { p1: User; p2: User | null }[] {
    players.sort((a, b) => b.points - a.points);
    let pairings: { p1: User; p2: User | null }[] = [];
    let unpaired = [...players];
  
    while (unpaired.length > 1) {
      const p1 = unpaired.shift()!;
      for (let i = 0; i < unpaired.length; i++) {
        const p2 = unpaired[i];
        if (!p1.opponents.includes(p2.username)) {
          pairings.push({ p1, p2 });
          p1.opponents.push(p2.username);
          p2.opponents.push(p1.username);
          unpaired.splice(i, 1);
          break;
        }
      }
    }
  
    if (unpaired.length === 1) {
      pairings.push({ p1: unpaired[0], p2: null });
    }
  
    return pairings;
  }
}  
