import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { TournamentDto } from './dto/tournament.dto';
import { TournamentService } from './tournament.service';
import { ApiBearerAuth, ApiOperation,ApiTags } from "@nestjs/swagger"
import { UserRole } from 'src/types/user';
import { Roles } from 'src/global/decorators/roles';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/global/guards/roles.guard';

@ApiTags('tournaments')
@Controller('tournament')
export class TournamentController {
    constructor(private readonly tournamentService : TournamentService){}

    @Get('all')
    getTournaments(){
        return this.tournamentService.getTournaments()
    }

    @ApiOperation({
        summary:`${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('single/:id')
    getTournamentSingle(@Param('id') id: string){
        return this.tournamentService.getTournamentSingle(id)
    }

    @ApiOperation({
        summary:`${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post('create')
    createTournament(@Body() payload : TournamentDto){
        return this.tournamentService.createTournament(payload)
    }
}
