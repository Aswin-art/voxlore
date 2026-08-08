import { Controller, Get } from '@nestjs/common';
import { GetStatsService } from './get-stats.service';
import { AdminStatsResponseDto } from './get-stats.dto';

@Controller('admin/stats')
export class GetStatsController {
  constructor(private readonly getStatsService: GetStatsService) {}

  @Get()
  getStats(): AdminStatsResponseDto {
    return this.getStatsService.execute();
  }
}
