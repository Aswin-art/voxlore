import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminStore, Review } from '../admin.store';
import { UpdateReviewStatusDto } from './manage-reviews.dto';

@Injectable()
export class ManageReviewsService {
  constructor(private readonly store: AdminStore) {}

  findAll(): Review[] {
    return this.store.getReviews();
  }

  findOne(id: string): Review {
    const review = this.store.getReviewById(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }

  updateStatus(id: string, dto: UpdateReviewStatusDto): Review {
    const updated = this.store.updateReviewStatus(id, dto.status);
    if (!updated) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return updated;
  }

  delete(id: string): { success: boolean } {
    const deleted = this.store.deleteReview(id);
    if (!deleted) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return { success: true };
  }
}
