import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminSeedService } from './features/admin/seed/admin-seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(AdminSeedService);

  const result = seedService.seed();
  console.log('Seeding completed:', result);

  await app.close();
}

bootstrap();
