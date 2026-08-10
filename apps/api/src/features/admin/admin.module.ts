import { Module } from '@nestjs/common';
import { GetStatsController } from './get-stats/get-stats.controller';
import { GetStatsService } from './get-stats/get-stats.service';
import { ManageDestinationsController } from './manage-destinations/manage-destinations.controller';
import { ManageDestinationsService } from './manage-destinations/manage-destinations.service';
import { ManageEventsController } from './manage-events/manage-events.controller';
import { ManageEventsService } from './manage-events/manage-events.service';
import { ManageReviewsController } from './manage-reviews/manage-reviews.controller';
import { ManageReviewsService } from './manage-reviews/manage-reviews.service';

@Module({
  controllers: [
    GetStatsController,
    ManageDestinationsController,
    ManageEventsController,
    ManageReviewsController,
  ],
  providers: [
    GetStatsService,
    ManageDestinationsService,
    ManageEventsService,
    ManageReviewsService,
  ],
})
export class AdminModule {}
