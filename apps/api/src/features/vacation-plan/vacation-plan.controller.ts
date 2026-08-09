import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/auth.guard';
import { VacationPlanService } from './vacation-plan.service';

@Controller('vacation-plan')
@UseGuards(JwtAuthGuard)
export class VacationPlanController {
  constructor(private readonly service: VacationPlanService) {}

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.service.findAll(request.user.sub);
  }

  @Post()
  add(@Req() request: AuthenticatedRequest, @Body() body: { id: string; type: string; title: string; location: string; date?: string; image?: string }) {
    return this.service.add(request.user.sub, body);
  }

  @Delete(':id')
  remove(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.service.remove(request.user.sub, id);
  }

  @Delete()
  clear(@Req() request: AuthenticatedRequest) {
    return this.service.clear(request.user.sub);
  }
}
