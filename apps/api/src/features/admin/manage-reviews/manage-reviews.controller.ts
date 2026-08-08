import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ManageReviewsService } from './manage-reviews.service';
import { UpdateReviewStatusDto } from './manage-reviews.dto';
import { Review } from '../admin.store';

@Controller('admin/reviews')
export class ManageReviewsController {
  constructor(private readonly reviewsService: ManageReviewsService) {}

  @Get()
  findAll(): Review[] {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Review {
    return this.reviewsService.findOne(id);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateReviewStatusDto,
  ): Review {
    return this.reviewsService.updateStatus(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { success: boolean } {
    return this.reviewsService.delete(id);
  }
}
