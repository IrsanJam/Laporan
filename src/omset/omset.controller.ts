import { Controller, Get } from '@nestjs/common';
import { OmsetService } from './omset.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Omset')
@Controller('omset')
export class OmsetController {
constructor(private omsetService:OmsetService){}

    @Get()
    @ApiOperation({ summary: 'Get all omset' })
    @ApiResponse({ status: 200, description: 'Success' })
    findAllOmset() {
        return this.omsetService.findAll();
    }
}
