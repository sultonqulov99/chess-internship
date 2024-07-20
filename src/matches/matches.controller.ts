import { Controller, Post, Body, UseGuards, Get, Param} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/global/decorators/roles';
import { UserRole } from 'src/types/user';
import { MatchesDto } from './dto/matches.dto';
import { MatchesService } from './matches.service';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/global/guards/roles.guard';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
    constructor(private readonly matchesService : MatchesService){}

    @ApiOperation({
        summary: `${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('rankings/:id')
    getUserRankings(@Param('id') id : string) {
        return this.matchesService.getUserRankings(id)
    }

    @ApiOperation({
        summary: `${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    createMatches(@Body() payload : MatchesDto){
        return this.matchesService.createMatches(payload)
    }
}
