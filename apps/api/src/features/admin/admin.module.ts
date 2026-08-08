import { Module } from '@nestjs/common';
import { AdminStore } from './admin.store';
import { GetStatsController } from './get-stats/get-stats.controller';
import { GetStatsService } from './get-stats/get-stats.service';
import { ManageDestinationsController } from './manage-destinations/manage-destinations.controller';
import { ManageDestinationsService } from './manage-destinations/manage-destinations.service';
import { ManageEventsController } from './manage-events/manage-events.controller';
import { ManageEventsService } from './manage-events/manage-events.service';
import { ManageReviewsController } from './manage-reviews/manage-reviews.controller';
import { ManageReviewsService } from './manage-reviews/manage-reviews.service';
import { AdminSeedService } from './seed/admin-seed.service';

@Module({
  controllers: [
    GetStatsController,
    ManageDestinationsController,
    ManageEventsController,
    ManageReviewsController,
  ],
  providers: [
    AdminStore,
    GetStatsService,
    ManageDestinationsService,
    ManageEventsService,
    ManageReviewsService,
    AdminSeedService,
  ],
  exports: [AdminSeedService, AdminStore],
})
export class AdminModule {}
