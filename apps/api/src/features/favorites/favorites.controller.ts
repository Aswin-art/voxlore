import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/auth.guard';
import { ToggleFavoriteDto } from './dto/toggle-favorite.dto';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getUserFavorites(@Req() req: AuthenticatedRequest) {
    return this.favoritesService.getUserFavorites(req.user.sub);
  }

  @Post('toggle')
  @HttpCode(HttpStatus.OK)
  toggleFavorite(@Req() req: AuthenticatedRequest, @Body() dto: ToggleFavoriteDto) {
    return this.favoritesService.toggleFavorite(req.user.sub, dto);
  }
}
