import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Participation, ParticipationSchema } from 'src/participation/schema/participation.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { PairingsController } from './pairings.controller';
import { PairingsService } from './pairings.service';
import { Pairing, PairingSchema } from './schema/pairings.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Pairing.name,schema:PairingSchema},
      {name:Participation.name,schema:ParticipationSchema},
      {name:User.name,schema:UserSchema}
    ])
  ],
  controllers: [PairingsController],
  providers: [PairingsService]
})
export class PairingsModule {}
