import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TournamentModule } from './tournament/tournament.module';
import { UserModule } from './user/user.module';
import { ParticipationModule } from './participation/participation.module';
import { PairingsModule } from './pairings/pairings.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    TournamentModule,
    UserModule,
    ParticipationModule,
    PairingsModule,
    MatchesModule
  ]
})
export class AppModule {}
