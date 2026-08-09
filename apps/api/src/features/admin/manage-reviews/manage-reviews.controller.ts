import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { ManageReviewsService, Review } from './manage-reviews.service';
import { UpdateReviewStatusDto } from './manage-reviews.dto';

@Controller('admin/reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class ManageReviewsController {
  constructor(private readonly reviewsService: ManageReviewsService) {}
  @Get() findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }
  @Get(':id') findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(id);
  }
  @Put(':id/status') updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateReviewStatusDto,
  ): Promise<Review> {
    return this.reviewsService.updateStatus(id, dto);
  }
  @Delete(':id') delete(
    @Param('id') id: string,
  ): Promise<{ success: boolean }> {
    return this.reviewsService.delete(id);
  }
}
