import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ManageDestinationsService } from './manage-destinations.service';
import {
  CreateDestinationDto,
  UpdateDestinationDto,
} from './manage-destinations.dto';
import { Destination } from '../admin.store';

@Controller('admin/destinations')
export class ManageDestinationsController {
  constructor(
    private readonly destinationsService: ManageDestinationsService,
  ) {}

  @Get()
  findAll(): Destination[] {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Destination {
    return this.destinationsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDestinationDto): Destination {
    return this.destinationsService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDestinationDto,
  ): Destination {
    return this.destinationsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { success: boolean } {
    return this.destinationsService.delete(id);
  }
}
