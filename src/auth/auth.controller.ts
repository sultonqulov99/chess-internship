import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('register')
    register(@Body() payload : RegisterDto){
        return this.authService.register(payload)
    }
    @Post('login')
    login(@Body() payload : LoginDto){
        return this.authService.login(payload)
    }
}
