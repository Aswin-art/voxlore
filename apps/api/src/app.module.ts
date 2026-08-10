import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './features/admin/admin.module';
import { AuthModule } from './features/auth/auth.module';
import { PublicModule } from './features/public/public.module';
import { VacationPlanModule } from './features/vacation-plan/vacation-plan.module';
import { TravelPlanModule } from './features/travel-plan/travel-plan.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AdminModule,
    AuthModule,
    PublicModule,
    VacationPlanModule,
    TravelPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
