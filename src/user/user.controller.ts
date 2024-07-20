import { Controller,Post, Body,UseGuards,Get, Param, Delete, Put } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiOperation,ApiBearerAuth ,ApiTags} from "@nestjs/swagger"
import { UserRole } from 'src/types/user';
import { Roles } from 'src/global/decorators/roles';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/global/guards/roles.guard';
import { UserUpdateDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller()
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get('user/single/:id')
    getSingleUser(@Param('id') id : string){
        return this.userService.getSingleUser(id)
    }

    @ApiOperation({
        summary: `${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('users/all')
    getUsers(){
        return this.userService.getUsers()
    }

    @ApiOperation({
        summary: `${UserRole.SUPER_ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
    @Post('admin/create')
    createAdmin(@Body() payload: UserDto){
        return this.userService.createAdmin(payload)
    }

    @ApiOperation({
        summary: `${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post('user/create')
    createUser(@Body() payload: UserDto){
        return this.userService.createUser(payload)
    }

    @ApiOperation({
        summary: `${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put('user/update')
    updateUser(@Body() payload : UserUpdateDto){
        return this.userService.updateUser(payload)
    }

    @ApiOperation({
        summary: `${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete('user/delete/:id')
    deleteUser(@Param('id') id : string){
        return this.userService.deleteUser(id)
    }
}
