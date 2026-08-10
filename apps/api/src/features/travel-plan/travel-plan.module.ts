import { Module } from '@nestjs/common';
import { TravelPlanController } from './travel-plan.controller';
import { TravelPlanService } from './travel-plan.service';

@Module({
  controllers: [TravelPlanController],
  providers: [TravelPlanService],
})
export class TravelPlanModule {}
