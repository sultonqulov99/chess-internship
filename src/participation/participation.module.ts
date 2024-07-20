import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipationController } from './participation.controller';
import { ParticipationService } from './participation.service';
import { Participation, ParticipationSchema } from './schema/participation.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Participation.name, schema: ParticipationSchema}])
  ],
  controllers: [ParticipationController],
  providers: [ParticipationService]
})
export class ParticipationModule {}
