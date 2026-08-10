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
import {
  ManageDestinationsService,
  AdminDestination,
} from './manage-destinations.service';
import {
  CreateDestinationDto,
  UpdateDestinationDto,
} from './manage-destinations.dto';

@Controller('admin/destinations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class ManageDestinationsController {
  constructor(
    private readonly destinationsService: ManageDestinationsService,
  ) {}

  @Get()
  findAll(): Promise<AdminDestination[]> {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AdminDestination> {
    return this.destinationsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDestinationDto): Promise<AdminDestination> {
    return this.destinationsService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDestinationDto,
  ): Promise<AdminDestination> {
    return this.destinationsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.destinationsService.delete(id);
  }
}
