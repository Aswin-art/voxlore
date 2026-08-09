import { Module } from '@nestjs/common';
import { VacationPlanController } from './vacation-plan.controller';
import { VacationPlanService } from './vacation-plan.service';

@Module({
  controllers: [VacationPlanController],
  providers: [VacationPlanService],
})
export class VacationPlanModule {}
