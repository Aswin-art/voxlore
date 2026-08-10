import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { JwtAuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/auth.guard';
import { VacationPlanService, VacationPlanInput } from './vacation-plan.service';

class VacationPlanDto implements VacationPlanInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  id!: string;

  @IsString()
  @IsIn(['festival', 'destination'])
  type!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  location!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  image?: string;
}

@Controller('vacation-plan')
@UseGuards(JwtAuthGuard)
export class VacationPlanController {
  constructor(private readonly service: VacationPlanService) {}

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.service.findAll(request.user.sub);
  }

  @Post()
  add(
    @Req() request: AuthenticatedRequest,
    @Body() body: VacationPlanDto,
  ) {
    return this.service.add(request.user.sub, body);
  }

  @Delete(':id')
  remove(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
    @Query('type') type?: string,
  ) {
    return this.service.remove(request.user.sub, id, type);
  }

  @Delete()
  clear(@Req() request: AuthenticatedRequest) {
    return this.service.clear(request.user.sub);
  }
}
