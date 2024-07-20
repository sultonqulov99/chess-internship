import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt/dist';
import { Register, RegisterSchema } from './schema/register.schema';

@Module({
  imports:[
    JwtModule.register({
      global:true,
      secret:"SHAFTOLI",
      signOptions:{expiresIn:'3600s'}
    }),
    MongooseModule.forFeature([{name:Register.name, schema:RegisterSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
