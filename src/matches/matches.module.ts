import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tournament, TournamentSchema } from 'src/tournament/schema/tournament.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { Match, MatchSchema } from './schema/matches.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Match.name, schema : MatchSchema},
      {name:User.name, schema : UserSchema}
    ])
  ],
  controllers: [MatchesController],
  providers: [MatchesService]
})
export class MatchesModule {}
