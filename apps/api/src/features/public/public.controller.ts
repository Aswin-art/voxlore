import { Body, Controller, Get, Header, Param, ParseIntPipe, Post, Query, Put, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/auth.guard';
import { PublicService } from './public.service';
import { CreateReviewDto } from './dto/create-review.dto';
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
  ): Promise<Destination[]> {
    return this.publicService.getAllDestinations({
      province,
      region,
      category,
      search,
    });
  }

  @Get('destinations/:id')
  getDestinationById(@Param('id') id: string): Promise<Destination> {
    return this.publicService.getDestinationById(id);
  }

  @Get('destinations/:id/reviews')
  getDestinationReviews(@Param('id') id: string) {
    return this.publicService.getDestinationReviews(id);
  }

  @Get('destinations/:id/audio/:spotNumber')
  @Header('Cache-Control', 'public, max-age=3600')
  async getAudioSpot(
    @Param('id') id: string,
    @Param('spotNumber', ParseIntPipe) spotNumber: number,
  ) {
    const spot = await this.publicService.getAudioSpot(id, spotNumber);
    return { audioUrl: spot.audioUrl };
  }

  @Get('destinations/:id/audio/:spotNumber/download')
  async downloadAudioSpot(
    @Param('id') id: string,
    @Param('spotNumber', ParseIntPipe) spotNumber: number,
    @Res() response: Response,
  ) {
    const spot = await this.publicService.getAudioSpot(id, spotNumber);
    response.setHeader('Content-Disposition', `attachment; filename="${spot.id}.mp3"`);
    return response.redirect(spot.audioUrl!);
  }

  @UseGuards(JwtAuthGuard)
  @Post('destinations/:id/reviews')
  createDestinationReview(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateReviewDto,
  ) {
    return this.publicService.createDestinationReview(id, request.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('reviews/:id/helpful')
  toggleHelpfulVote(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.publicService.toggleHelpfulVote(id, request.user.sub);
  }

  @Get('festivals')
  getFestivals(
    @Query('province') province?: string,
    @Query('region') region?: string,
    @Query('type') type?: string,
    @Query('search') search?: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ): Promise<CulturalFestival[]> {
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
  getFestivalById(@Param('id') id: string): Promise<CulturalFestival> {
    return this.publicService.getFestivalById(id);
  }

  @Get('provinces')
  getProvinces(): Promise<string[]> {
    return this.publicService.getProvinces();
  }
}