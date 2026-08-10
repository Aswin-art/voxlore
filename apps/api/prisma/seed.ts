import { PrismaClient, ReviewStatus, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PUBLIC_DESTINATIONS, PUBLIC_FESTIVALS } from '../src/features/public/catalog.data';

const prisma = new PrismaClient();

function audioUrlFor(destinationId: string, spotNumber: number): string | undefined {
  const baseUrl = process.env.AUDIO_SPOT_BASE_URL?.trim().replace(/\/$/, '');
  return baseUrl ? `${baseUrl}/${destinationId}/spot-${spotNumber}.mp3` : undefined;
}

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@voxlore.id';
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error('ADMIN_PASSWORD is required for seeding');

  await prisma.$transaction(async (tx) => {
    await tx.user.upsert({
      where: { email },
      update: { name: 'Admin Voxlore', role: UserRole.SUPER_ADMIN },
      create: {
        name: 'Admin Voxlore',
        email,
        role: UserRole.SUPER_ADMIN,
        passwordHash: await bcrypt.hash(password, 12),
      },
    });

    for (const item of PUBLIC_DESTINATIONS) {
      const destination = await tx.destination.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      const audioUrl = audioUrlFor(destination.id, 1);
      if (audioUrl) {
        await tx.audioSpot.upsert({
          where: { destinationId_spotNumber: { destinationId: destination.id, spotNumber: 1 } },
          update: {
            title: `Panduan ${destination.title}`,
            duration: destination.duration,
            description: destination.description,
            audioUrl,
            isFree: true,
          },
          create: {
            destinationId: destination.id,
            spotNumber: 1,
            title: `Panduan ${destination.title}`,
            duration: destination.duration,
            description: destination.description,
            audioUrl,
            isFree: true,
          },
        });
      }
      const audioCount = await tx.audioSpot.count({ where: { destinationId: destination.id } });
      await tx.destination.update({ where: { id: destination.id }, data: { audioCount } });
    }

    for (const item of PUBLIC_FESTIVALS) {
      await tx.festival.upsert({ where: { id: item.id }, update: item, create: item });
    }

    await tx.review.upsert({
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
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
