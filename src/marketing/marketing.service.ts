import { Body, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marketing } from './marketing.entity';
import { MarketingDto } from './dtos/marketing';

@Injectable()
export class MarketingService {
    constructor(@InjectRepository(Marketing) private MarketingRepository:Repository<Marketing> ) {}

    async findAll() {
        const marketing = await this.MarketingRepository.find();
        if(marketing.length === 0){
            throw new HttpException('Not Found', 404);
        }
        return marketing
    }

    async findOne(id: number) {
        const marketing = await this.MarketingRepository.findOneBy({id});
        if (!marketing) {
            throw new HttpException('Marketing not found', 404);
        }
        return marketing;
    }

    async create(@Body() marketingData: MarketingDto) {
        const marketing = this.MarketingRepository.create(marketingData);
        return await this.MarketingRepository.save(marketing);
    }
    

    async update(id: number, @Body() marketingData: MarketingDto) {
        const marketing = await this.MarketingRepository.findOneBy({id});
        if(marketing){
            Object.assign(marketing, marketingData)
          return this.MarketingRepository.save(marketing);
        }else {
            throw new HttpException('ID Marketing not found', 404)
        }
    }

    async remove(id: number) {
        const marketing = await this.MarketingRepository.findOneBy({id});
        if(marketing){
            this.MarketingRepository.remove(marketing);
            return {
                message: 'Deleted Successfully',
                status: 200
            }    
        }else{
            throw new HttpException('ID Marketing not found', 404)
        }
        
    }
}
