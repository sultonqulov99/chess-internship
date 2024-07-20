import { Controller,Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PairingsService } from './pairings.service';

@ApiTags('pairings')
@Controller('pairings')
export class PairingsController {
    constructor(private readonly pairingService : PairingsService){}

    @Get(':id')
    createPairings(@Param('id') id : string){
        return this.pairingService.getGeneratePairings(id)
    }
}

