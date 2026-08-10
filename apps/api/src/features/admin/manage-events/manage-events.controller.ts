import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { ManageEventsService, CulturalEvent } from './manage-events.service';
import { CreateEventDto, UpdateEventDto } from './manage-events.dto';

@Controller('admin/events')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class ManageEventsController {
  constructor(private readonly eventsService: ManageEventsService) {}

  @Get()
  findAll(): Promise<CulturalEvent[]> {
    return this.eventsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CulturalEvent> {
    return this.eventsService.findOne(id);
  }
  @Post()
  create(@Body() dto: CreateEventDto): Promise<CulturalEvent> {
    return this.eventsService.create(dto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
  ): Promise<CulturalEvent> {
    return this.eventsService.update(id, dto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.eventsService.delete(id);
  }
}
