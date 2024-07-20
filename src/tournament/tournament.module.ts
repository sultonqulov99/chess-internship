import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Tournament, TournamentSchema } from './schema/tournament.schema';
import { Participation, ParticipationSchema } from 'src/participation/schema/participation.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Tournament.name, schema: TournamentSchema},
      {name: Participation.name, schema: ParticipationSchema},
      {name: User.name, schema: UserSchema}
    ]),
  ],
  controllers: [TournamentController],
  providers: [TournamentService]
})
export class TournamentModule {}
