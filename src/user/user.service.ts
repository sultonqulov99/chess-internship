import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { UserUpdateDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>){}

    async getSingleUser(id : string) {
        return await this.userModel.findOne({_id : id}).exec()
    }

    async createAdmin(payload : UserDto){

        const hashPassword = await bcrypt.hash(payload.password, 10);
        const create = new this.userModel({
            ...payload,
            password: hashPassword,
            role:'ADMIN'
        })

        return await create.save()
    }

    async createUser(payload : UserDto){
        const hashPassword = await bcrypt.hash(payload.password, 10);
        const create = new this.userModel({
            ...payload,
            password: hashPassword
        })

        return await create.save()
    }

    async getUsers(){
        return await this.userModel.find({role:"USER"}).exec()
    }

    async deleteUser(id : string) {
        if (!isValidObjectId(id)) {
            throw new HttpException("Invalid User ID format", HttpStatus.BAD_REQUEST);
        }

        const existUser = await this.userModel.findOne({_id : id}).exec()

        if(!existUser){
            throw new HttpException("User not exists",HttpStatus.NOT_FOUND)
        }
        await this.userModel.findByIdAndDelete({_id:id})
    
        return {
            success: true,
            message: 'User deleted',
          };
    }

    async updateUser(payload : UserUpdateDto){

        const existUser = await this.userModel.findOne({_id : payload.userId}).exec()

        if(!existUser){
            throw new HttpException("User not exists",HttpStatus.NOT_FOUND)
        }
        await this.userModel.findByIdAndUpdate(existUser._id, { $set: payload })
    
        return {
            success: true,
            message: 'User updated',
          };
    }

}
   