import { Module } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { MarketingController } from './marketing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marketing } from './marketing.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Marketing])],
  exports:[TypeOrmModule],
  providers: [MarketingService],
  controllers: [MarketingController]
})
export class MarketingModule {}
