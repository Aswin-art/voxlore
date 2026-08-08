import { Injectable } from '@nestjs/common';
import { AdminStore } from '../admin.store';

@Injectable()
export class AdminSeedService {
  constructor(private readonly store: AdminStore) {}

  seed() {
    this.store.seedDefaultData();
    return {
      message: 'Admin initial data seeded successfully',
      adminUser: this.store.getAdminUser(),
      destinationsCount: this.store.getDestinations().length,
      eventsCount: this.store.getEvents().length,
      reviewsCount: this.store.getReviews().length,
    };
  }
}
