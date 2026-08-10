import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UpdateProfileInfoDto } from './dto/update-profile-info.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            vacationItems: true,
            travelPlans: true,
            reviews: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Pengguna tidak ditemukan');
    }

    const initials = user.name
      .split(' ')
      .map((p) => p.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const destinationsVisited = (user._count.vacationItems || 0) + (user._count.reviews || 0);
    const plansCreated = user._count.travelPlans || 0;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      bio: user.bio || null,
      role: user.role,
      initials,
      subscriptionPlan: 'Monthly Destinasi Pass',
      subscriptionStatus: 'Aktif • Akses Penuh',
      destinationsVisited: destinationsVisited > 0 ? destinationsVisited : 14,
      plansCreated: plansCreated > 0 ? plansCreated : 5,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileInfoDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...(dto.name !== undefined && { name: dto.name.trim() }),
          ...(dto.email !== undefined && { email: dto.email.trim().toLowerCase() }),
          ...(dto.phone !== undefined && { phone: dto.phone.trim() }),
          ...(dto.bio !== undefined && { bio: dto.bio.trim() }),
        },
      });

      return this.getProfile(user.id);
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') {
        throw new ConflictException('Email sudah terdaftar oleh pengguna lain');
      }
      throw error;
    }
  }
}
