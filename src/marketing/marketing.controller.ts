import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { MarketingDto } from './dtos/marketing';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Marketing')
@Controller('marketing')
export class MarketingController {
    constructor(private marketingService:MarketingService){}

    @Get()
    @ApiOperation({ summary: 'Get all marketing' })
    @ApiResponse({ status: 200, description: 'Get all marketing' })
    findAllMarketing(){
        return this.marketingService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get one marketing' })
    @ApiResponse({ status: 200, description: 'Get one marketing' })
    findOneMarketing(@Param('id') id:number){
        return this.marketingService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create one marketing' })
    @ApiResponse({ status: 201, description: 'Create one marketing' })
    createMarketing(@Body() marketingData:MarketingDto){
        return this.marketingService.create(marketingData);
    }

    @ApiOperation({ summary: 'Update one marketing' })
    @ApiResponse({ status: 200, description: 'Update one marketing' })
    @Patch(':id')
    updateMarketing(@Param('id') id:number, @Body() Body:MarketingDto){
        return this.marketingService.update(id, Body);
    }

    @ApiOperation({ summary: 'Delete one marketing' })
    @ApiResponse({ status: 200, description: 'Delete one marketing' })
    @Delete(':id')
    removeMarketing(@Param('id') id:number){
        return this.marketingService.remove(id);
    }

}
