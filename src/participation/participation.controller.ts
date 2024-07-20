import { Controller,Post, Body,UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/global/decorators/roles';
import { RolesGuard } from 'src/global/guards/roles.guard';
import { UserRole } from 'src/types/user';
import { ParticipationDto } from './dto/participation.dto';
import { ParticipationService } from './participation.service';

@ApiTags('participations')
@Controller('participation')
export class ParticipationController {
    constructor(private readonly participartionServer : ParticipationService){}

    @ApiOperation({
        summary: `${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post('create')
    createParticipation(@Body() payload : ParticipationDto){
        return this.participartionServer.createParticipation(payload)
    }
}
