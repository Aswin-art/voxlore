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
import { ProfileModule } from './features/profile/profile.module';
import { PackagesModule } from './features/packages/packages.module';
import { ScanModule } from './features/scan/scan.module';
import { SecurityModule } from './features/security/security.module';
import { FavoritesModule } from './features/favorites/favorites.module';
import { DownloadsModule } from './features/downloads/downloads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AdminModule,
    AuthModule,
    PublicModule,
    VacationPlanModule,
    TravelPlanModule,
    ProfileModule,
    PackagesModule,
    ScanModule,
    SecurityModule,
    FavoritesModule,
    DownloadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
