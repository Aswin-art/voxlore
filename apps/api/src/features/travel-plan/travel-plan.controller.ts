import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/auth.guard';
import {
  AddTravelPlanItemDto,
  CreateTravelPlanDto,
  UpdateTravelPlanDto,
} from './travel-plan.dto';
import { TravelPlanService } from './travel-plan.service';

@Controller('travel-plans')
@UseGuards(JwtAuthGuard)
export class TravelPlanController {
  constructor(private readonly service: TravelPlanService) {}

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.service.findAll(request.user.sub);
  }

  @Post()
  create(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateTravelPlanDto,
  ) {
    return this.service.create(request.user.sub, dto);
  }

  @Get(':id')
  findOne(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.service.findOne(request.user.sub, id);
  }

  @Patch(':id')
  update(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateTravelPlanDto,
  ) {
    return this.service.update(request.user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.service.remove(request.user.sub, id);
  }

  @Post(':id/items')
  addItem(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: AddTravelPlanItemDto,
  ) {
    return this.service.addItem(request.user.sub, id, dto.festivalId);
  }

  @Delete(':id/items/:festivalId')
  removeItem(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
    @Param('festivalId') festivalId: string,
  ) {
    return this.service.removeItem(request.user.sub, id, festivalId);
  }
}
