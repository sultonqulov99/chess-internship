import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { Register, RegisterDocument } from './schema/register.schema';
import { JwtService } from "@nestjs/jwt"
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Register.name) 
        private userModel : Model<RegisterDocument>,
        private jwtService : JwtService
    ){}

    async register(payload : RegisterDto){
        
        const existUser = await this.userModel.findOne({username : payload.username}).exec()

        if(existUser){
            throw new HttpException('User name alredy exists',HttpStatus.BAD_REQUEST)
        }
        
        const hashPassword = await bcrypt.hash(payload.password, 10);
        const create = new this.userModel({
            ...payload,
            password : hashPassword
        })
        create.save()

        const token = this.jwtService.sign({userId:create._id, role:create.role})
        return {token}
    }

    async login(payload : LoginDto){
        
        const existUser = await this.userModel.findOne({username : payload.username})

        if(!existUser){
            throw new HttpException("User not exists",HttpStatus.NOT_FOUND)
        }

        const isPasswordValid = await bcrypt.compare(payload.password, existUser.password);

        if (!isPasswordValid) {
            throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        const token = this.jwtService.sign({userId:existUser._id, role:existUser.role})

        return {token}
    }
}
