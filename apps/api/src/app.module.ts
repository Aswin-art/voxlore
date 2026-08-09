import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './features/admin/admin.module';
import { AuthModule } from './features/auth/auth.module';
import { PublicModule } from './features/public/public.module';

@Module({
  imports: [AdminModule, AuthModule, PublicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
