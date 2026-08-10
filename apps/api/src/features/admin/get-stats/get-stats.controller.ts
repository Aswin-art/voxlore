import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { GetStatsService } from './get-stats.service';
import { AdminStatsResponseDto } from './get-stats.dto';

@Controller('admin/stats')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class GetStatsController {
  constructor(private readonly getStatsService: GetStatsService) {}
  @Get()
  getStats(): Promise<AdminStatsResponseDto> {
    return this.getStatsService.execute();
  }
}
