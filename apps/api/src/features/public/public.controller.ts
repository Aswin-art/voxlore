import { Controller, Get, Param, Query } from '@nestjs/common';
import { PublicService } from './public.service';
import type { Destination, CulturalFestival } from './catalog.types';

@Controller()
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('destinations')
  getDestinations(
    @Query('province') province?: string,
    @Query('region') region?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ): Destination[] {
    return this.publicService.getAllDestinations({
      province,
      region,
      category,
      search,
    });
  }

  @Get('destinations/:id')
  getDestinationById(@Param('id') id: string): Destination {
    return this.publicService.getDestinationById(id);
  }

  @Get('festivals')
  getFestivals(
    @Query('province') province?: string,
    @Query('region') region?: string,
    @Query('type') type?: string,
    @Query('search') search?: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ): CulturalFestival[] {
    return this.publicService.getFestivals({
      province,
      region,
      type,
      search,
      start,
      end,
    });
  }

  @Get('festivals/:id')
  getFestivalById(@Param('id') id: string): CulturalFestival {
    return this.publicService.getFestivalById(id);
  }

  @Get('provinces')
  getProvinces(): string[] {
    return this.publicService.getProvinces();
  }
}