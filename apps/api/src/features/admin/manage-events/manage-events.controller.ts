import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ManageEventsService } from './manage-events.service';
import { CreateEventDto, UpdateEventDto } from './manage-events.dto';
import { CulturalEvent } from '../admin.store';

@Controller('admin/events')
export class ManageEventsController {
  constructor(private readonly eventsService: ManageEventsService) {}

  @Get()
  findAll(): CulturalEvent[] {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): CulturalEvent {
    return this.eventsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEventDto): CulturalEvent {
    return this.eventsService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
  ): CulturalEvent {
    return this.eventsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { success: boolean } {
    return this.eventsService.delete(id);
  }
}
