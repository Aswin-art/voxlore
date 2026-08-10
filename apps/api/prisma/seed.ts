import { Prisma, PrismaClient, ReviewStatus, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PUBLIC_DESTINATIONS, PUBLIC_FESTIVALS } from '../src/features/public/catalog.data';

const prisma = new PrismaClient();

const DEFAULT_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

function audioUrlFor(destinationId: string, spotNumber: number): string {
  const baseUrl = process.env.AUDIO_SPOT_BASE_URL?.trim().replace(/\/$/, '');
  return baseUrl ? `${baseUrl}/${destinationId}/spot-${spotNumber}.mp3` : DEFAULT_AUDIO_URL;
}

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@gmail.com';
  const password = process.env.ADMIN_PASSWORD ?? 'password';

  console.log('🌱 Memulai seeding database Voxlore...');

  console.log('🧹 Membersihkan data lama di database...');
  await prisma.$transaction([
    prisma.reviewVote.deleteMany(),
    prisma.review.deleteMany(),
    prisma.travelPlanItem.deleteMany(),
    prisma.travelPlan.deleteMany(),
    prisma.vacationPlanItem.deleteMany(),
    prisma.favorite.deleteMany(),
    prisma.userSubscription.deleteMany(),
    prisma.subscriptionPackage.deleteMany(),
    prisma.audioSpot.deleteMany(),
    prisma.destination.deleteMany(),
    prisma.festival.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  console.log('✨ Data lama berhasil dibersihkan.');

  // 1. Seed Users
  const adminPasswordHash = await bcrypt.hash(password, 12);
  const userPasswordHash = await bcrypt.hash('password', 12);

  const [admin, memberUser] = await Promise.all([
    prisma.user.upsert({
      where: { email },
      update: { name: 'Admin Voxlore', role: UserRole.SUPER_ADMIN },
      create: {
        name: 'Admin Voxlore',
        email,
        role: UserRole.SUPER_ADMIN,
        passwordHash: adminPasswordHash,
      },
    }),
    prisma.user.upsert({
      where: { email: 'user@gmail.com' },
      update: { name: 'Budi Santoso', role: UserRole.MEMBER },
      create: {
        name: 'Budi Santoso',
        email: 'user@gmail.com',
        role: UserRole.MEMBER,
        passwordHash: userPasswordHash,
        phone: '+6281234567890',
        bio: 'Pencinta sejarah dan budaya Nusantara.',
      },
    }),
  ]);

  console.log(`✅ User Admin (${admin.email}) dan Member (${memberUser.email}) berhasil diseed.`);

  // 2. Seed Destinations & AudioSpots concurrently
  const destPromises = PUBLIC_DESTINATIONS.map(async (item) => {
    const isPopular = item.isPopular ?? false;
    const expectedAudioCount = isPopular ? 2 : 1;

    const payload: Prisma.DestinationCreateInput = {
      id: item.id,
      title: item.title,
      city: item.city,
      province: item.province,
      location: item.location,
      region: item.region,
      category: item.category,
      description: item.description,
      image: item.image,
      price: item.price,
      rating: item.rating,
      duration: item.duration,
      listeners: item.listeners,
      isPopular,
      audioCount: expectedAudioCount,
      subtitle: item.subtitle,
    };

    const destination = await prisma.destination.upsert({
      where: { id: payload.id },
      update: payload,
      create: payload,
    });

    // Audio Spot 1 (Gratis / Free)
    const audioUrl1 = audioUrlFor(destination.id, 1);
    await prisma.audioSpot.upsert({
      where: { destinationId_spotNumber: { destinationId: destination.id, spotNumber: 1 } },
      update: {
        title: `Panduan Utama: ${destination.title}`,
        duration: destination.duration,
        description: destination.description,
        audioUrl: audioUrl1,
        isFree: true,
      },
      create: {
        destinationId: destination.id,
        spotNumber: 1,
        title: `Panduan Utama: ${destination.title}`,
        duration: destination.duration,
        description: destination.description,
        audioUrl: audioUrl1,
        isFree: true,
      },
    });

    let localAudioCount = 1;

    // Audio Spot 2 (Eksplorasi Mendalam / Premium untuk destinasi populer)
    if (isPopular) {
      const audioUrl2 = audioUrlFor(destination.id, 2);
      await prisma.audioSpot.upsert({
        where: { destinationId_spotNumber: { destinationId: destination.id, spotNumber: 2 } },
        update: {
          title: `Kisah & Arsitektur Rahasia: ${destination.title}`,
          duration: '15-20 min',
          description: `Penjelasan mendalam mengenai latar belakang sejarah dan nilai kebudayaan ${destination.title}.`,
          audioUrl: audioUrl2,
          isFree: false,
        },
        create: {
          destinationId: destination.id,
          spotNumber: 2,
          title: `Kisah & Arsitektur Rahasia: ${destination.title}`,
          duration: '15-20 min',
          description: `Penjelasan mendalam mengenai latar belakang sejarah dan nilai kebudayaan ${destination.title}.`,
          audioUrl: audioUrl2,
          isFree: false,
        },
      });
      localAudioCount++;
    }

    return { destCount: 1, audioCount: localAudioCount };
  });

  const destResults = await Promise.all(destPromises);
  const destCount = destResults.length;
  const audioCountTotal = destResults.reduce((sum, r) => sum + r.audioCount, 0);

  console.log(`✅ ${destCount} Destinasi dan ${audioCountTotal} Audio Spot berhasil diseed.`);

  // 3. Seed Festivals concurrently
  const festivalPromises = PUBLIC_FESTIVALS.map(async (item) => {
    const festivalPayload: Prisma.FestivalCreateInput = {
      id: item.id,
      title: item.title,
      province: item.province,
      region: item.region,
      city: item.city,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      date: item.date,
      monthBadge: item.monthBadge,
      dayBadge: item.dayBadge,
      description: item.description,
      image: item.image,
      videoUrl: item.videoUrl,
      type: item.type,
      isSponsored: item.isSponsored ?? false,
    };

    return prisma.festival.upsert({
      where: { id: festivalPayload.id },
      update: festivalPayload,
      create: festivalPayload,
    });
  });

  const festivals = await Promise.all(festivalPromises);
  console.log(`✅ ${festivals.length} Festival Budaya berhasil diseed.`);

  // 4. Seed Reviews
  const seedReviews = [
    {
      id: '00000000-0000-0000-0000-000000000001',
      destinationId: 'prambanan',
      destinationName: 'Candi Prambanan',
      userId: memberUser.id,
      userName: memberUser.name,
      rating: 5,
      comment: 'Panduan audio legenda Roro Jonggrang sangat imersif! Narasi dan musik latar sangat pas.',
      status: ReviewStatus.APPROVED,
      verified: true,
      helpfulCount: 12,
      tags: ['Audio Jernih', 'Narasi Imersif'],
    },
    {
      id: '00000000-0000-0000-0000-000000000002',
      destinationId: 'borobudur',
      destinationName: 'Candi Borobudur',
      userId: memberUser.id,
      userName: memberUser.name,
      rating: 5,
      comment: 'Sangat membantu memahami relief stupa lantai demi lantai tanpa butuh pemandu wisata fisik.',
      status: ReviewStatus.APPROVED,
      verified: true,
      helpfulCount: 8,
      tags: ['Alur Edukatif', 'Sangat Direkomendasikan'],
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      destinationId: 'tsunami-museum',
      destinationName: 'Museum Tsunami Aceh',
      userId: memberUser.id,
      userName: memberUser.name,
      rating: 5,
      comment: 'Lorong cerobong doa membuat merinding. Audio narasi menyentuh hati.',
      status: ReviewStatus.APPROVED,
      verified: true,
      helpfulCount: 15,
      tags: ['Narasi Imersif', 'Musik Etnik Pas'],
    },
    {
      id: '00000000-0000-0000-0000-000000000004',
      destinationId: 'prambanan',
      destinationName: 'Candi Prambanan',
      userName: 'Siti Rahma',
      rating: 4,
      comment: 'Bagus sekali! Hanya saja butuh tambahan titik spot di pelataran luar.',
      status: ReviewStatus.PENDING,
      verified: false,
      helpfulCount: 0,
      tags: ['Audio Jernih'],
    },
  ];

  await Promise.all(
    seedReviews.map((rev) =>
      prisma.review.upsert({
        where: { id: rev.id },
        update: {
          destinationId: rev.destinationId,
          destination: rev.destinationName,
          userId: rev.userId ?? null,
          userName: rev.userName,
          rating: rev.rating,
          comment: rev.comment,
          status: rev.status,
          verified: rev.verified,
          helpfulCount: rev.helpfulCount,
          tags: rev.tags,
        },
        create: {
          id: rev.id,
          destinationId: rev.destinationId,
          destination: rev.destinationName,
          userId: rev.userId ?? null,
          userName: rev.userName,
          rating: rev.rating,
          comment: rev.comment,
          status: rev.status,
          verified: rev.verified,
          helpfulCount: rev.helpfulCount,
          tags: rev.tags,
        },
      }),
    ),
  );

  console.log(`✅ ${seedReviews.length} Ulasan (Reviews) berhasil diseed.`);

  // 5. Seed Subscription Packages
  const subscriptionPackages = [
    {
      id: 'free',
      name: 'Sampel Gratis',
      subtitle: 'Freemium — membangun kepercayaan sebelum upgrade',
      price: 'Rp 0',
      numericPrice: 0,
      period: 'selamanya',
      bestSeller: false,
      features: [
        'Akses 3 Audio Guide populer',
        'Kualitas suara standar (64 kbps)',
      ],
    },
    {
      id: 'weekly-vacation-pass',
      name: 'Weekly Vacation Pass',
      subtitle: 'Terbaik untuk turis liburan satu minggu',
      price: 'Rp 29.000',
      numericPrice: 29000,
      period: 'minggu',
      bestSeller: false,
      features: [
        'Akses penuh 7 hari ke semua audio guide',
        'Unduhan luring saat perjalanan',
        'Narasi HD (320 kbps)',
      ],
    },
    {
      id: 'monthly-destinasi-pass',
      name: 'Monthly Destinasi Pass',
      subtitle: 'Untuk digital nomad, staycation, & traveler multi-destinasi',
      price: 'Rp 59.000',
      numericPrice: 59000,
      period: 'bulan',
      bestSeller: true,
      features: [
        'Akses Tanpa Batas 500+ Audio Guide',
        'Mode Unduhan Luring (Offline Audio)',
        'Narasi HD Suara Asli Budayawan (320 kbps)',
        'Bebas Iklan 100% saat Mendengarkan',
      ],
    },
    {
      id: 'annual-explorer-pass',
      name: 'Annual Explorer Pass',
      subtitle: 'Untuk traveler aktif & pegiat budaya',
      price: 'Rp 199.000',
      numericPrice: 199000,
      period: 'tahun',
      bestSeller: false,
      features: [
        'Semua fitur Monthly Destinasi Pass',
        'Akses Tiket VIP Event Kebudayaan',
        'Multi-Bahasa Narasi (Indo, Eng, Jap, Mand)',
        'Badge Spesial Profil & Dukungan Prioritas',
      ],
    },
  ];

  await Promise.all(
    subscriptionPackages.map((pkg) =>
      prisma.subscriptionPackage.upsert({
        where: { id: pkg.id },
        update: pkg,
        create: pkg,
      }),
    ),
  );

  const existingSub = await prisma.userSubscription.findFirst({
    where: { userId: memberUser.id },
  });

  if (!existingSub) {
    await prisma.userSubscription.create({
      data: {
        userId: memberUser.id,
        planId: 'monthly-destinasi-pass',
        status: 'Aktif • Akses Penuh',
      },
    });
  }

  console.log(`✅ ${subscriptionPackages.length} Paket Berlangganan (Subscription Packages) berhasil diseed.`);
  console.log('🎉 Seeding database Voxlore selesai dengan sukses!');
}

main()
  .catch((error) => {
    console.error('❌ Gagal melakukan seeding:', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

