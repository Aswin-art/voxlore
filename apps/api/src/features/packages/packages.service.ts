import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SubscribePackageDto } from './dto/subscribe-package.dto';

export interface SubscriptionPackageItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  numericPrice: number;
  period: string;
  bestSeller?: boolean;
  features: string[];
}

@Injectable()
export class PackagesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPackages(): Promise<SubscriptionPackageItem[]> {
    const packages = await this.prisma.subscriptionPackage.findMany({
      orderBy: { numericPrice: 'asc' },
    });

    return packages.map((p) => ({
      id: p.id,
      name: p.name,
      subtitle: p.subtitle,
      price: p.price,
      numericPrice: p.numericPrice,
      period: p.period,
      bestSeller: p.bestSeller,
      features: p.features,
    }));
  }

  async getPackageById(planId: string): Promise<SubscriptionPackageItem> {
    const pkg = await this.prisma.subscriptionPackage.findUnique({
      where: { id: planId },
    });

    if (!pkg) {
      throw new NotFoundException(`Paket berlangganan dengan ID '${planId}' tidak ditemukan`);
    }

    return {
      id: pkg.id,
      name: pkg.name,
      subtitle: pkg.subtitle,
      price: pkg.price,
      numericPrice: pkg.numericPrice,
      period: pkg.period,
      bestSeller: pkg.bestSeller,
      features: pkg.features,
    };
  }

  async getMySubscription(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Pengguna tidak ditemukan');
    }

    const activeSub = await this.prisma.userSubscription.findFirst({
      where: { userId },
      include: { package: true },
      orderBy: { createdAt: 'desc' },
    });

    let activePackage: SubscriptionPackageItem;

    if (activeSub) {
      activePackage = {
        id: activeSub.package.id,
        name: activeSub.package.name,
        subtitle: activeSub.package.subtitle,
        price: activeSub.package.price,
        numericPrice: activeSub.package.numericPrice,
        period: activeSub.package.period,
        bestSeller: activeSub.package.bestSeller,
        features: activeSub.package.features,
      };
    } else {
      activePackage = await this.getPackageById('monthly-destinasi-pass');
    }

    return {
      userId,
      activePackage,
      status: activeSub?.status || 'Aktif • Akses Penuh',
      activatedAt: activeSub?.createdAt || user.createdAt,
      expiresAt: null,
    };
  }

  async subscribe(userId: string, dto: SubscribePackageDto) {
    const selectedPackage = await this.getPackageById(dto.planId);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Pengguna tidak ditemukan');
    }

    const newSub = await this.prisma.userSubscription.create({
      data: {
        userId: user.id,
        planId: selectedPackage.id,
        status: 'Aktif • Akses Penuh',
      },
      include: { package: true },
    });

    return {
      success: true,
      message: `Berhasil berlangganan paket ${selectedPackage.name}`,
      subscription: {
        id: newSub.id,
        userId: user.id,
        planId: selectedPackage.id,
        planName: selectedPackage.name,
        price: selectedPackage.price,
        status: newSub.status,
        subscribedAt: newSub.createdAt,
      },
    };
  }
}
