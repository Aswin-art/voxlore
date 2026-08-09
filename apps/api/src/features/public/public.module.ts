import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { PublicStore } from './public.store';

@Module({
  controllers: [PublicController],
  providers: [PublicService, PublicStore],
  exports: [PublicService, PublicStore],
})
export class PublicModule {}