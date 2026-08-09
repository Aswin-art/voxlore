import { PrismaClient, ReviewStatus, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PUBLIC_DESTINATIONS, PUBLIC_FESTIVALS } from '../src/features/public/catalog.data';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@voxlore.id';
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error('ADMIN_PASSWORD is required for seeding');

  await prisma.user.upsert({
    where: { email },
    update: { name: 'Admin Voxlore', role: UserRole.SUPER_ADMIN },
    create: {
      name: 'Admin Voxlore',
      email,
      role: UserRole.SUPER_ADMIN,
      passwordHash: await bcrypt.hash(password, 12),
    },
  });

  await prisma.$transaction([
    ...PUBLIC_DESTINATIONS.map((item) => prisma.destination.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    })),
    ...PUBLIC_FESTIVALS.map((item) => prisma.festival.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    })),
  ]);

  await prisma.review.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      userName: 'Budi Santoso',
      destination: 'Candi Prambanan',
      rating: 5,
      comment: 'Panduan audio legenda Roro Jonggrang sangat imersif!',
      status: ReviewStatus.PENDING,
    },
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
