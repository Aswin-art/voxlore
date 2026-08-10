import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, randomBytes } from 'node:crypto';
import * as bcrypt from 'bcryptjs';
import { PrismaService, PrismaTransactionClient } from '../../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const SESSION_TTL_MS = 15 * 60 * 1000;

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  bio?: string | null;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private toPublicUser(user: PublicUser): PublicUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone ?? undefined,
      bio: user.bio ?? undefined,
    };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private async createSession(
    userId: string,
    prisma: PrismaService | PrismaTransactionClient = this.prisma,
  ) {
    const token = randomBytes(32).toString('base64url');
    await prisma.session.create({
      data: {
        userId,
        tokenHash: this.hashToken(token),
        expiresAt: new Date(Date.now() + SESSION_TTL_MS),
      },
    });
    return token;
  }

  private async ensureFreePackage(
    userId: string,
    prisma: PrismaService | PrismaTransactionClient = this.prisma,
  ) {
    const existingSub = await prisma.userSubscription.findFirst({
      where: { userId },
    });

    if (!existingSub) {
      await prisma.subscriptionPackage.upsert({
        where: { id: 'free' },
        update: {},
        create: {
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
      });

      await prisma.userSubscription.create({
        data: {
          userId,
          planId: 'free',
          status: 'Aktif • Sampel Gratis',
        },
      });
    }
  }

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            name: dto.name.trim(),
            email,
            passwordHash: await bcrypt.hash(dto.password, 12),
          },
        });
        await this.ensureFreePackage(user.id, tx);
        const token = await this.createSession(user.id, tx);
        return { user: this.toPublicUser(user), token };
      });
      return result;
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') {
        throw new ConflictException('Email sudah terdaftar');
      }
      throw error;
    }
  }

  async issueSession(userId: string) {
    return this.createSession(userId);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.trim().toLowerCase() },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Email atau kata sandi salah');
    }
    const token = await this.issueSession(user.id);
    return { user: this.toPublicUser(user), token };
  }

  private sessionCache = new Map<string, { data: { sub: string; email: string; role: string }; expiresAt: number }>();

  async getSession(token: string) {
    const tokenHash = this.hashToken(token);
    const cached = this.sessionCache.get(tokenHash);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    const session = await this.prisma.session.findFirst({
      where: { tokenHash, expiresAt: { gt: new Date() } },
      include: { user: true },
    });
    if (!session) throw new UnauthorizedException('Sesi tidak valid');

    const result = {
      sub: session.user.id,
      email: session.user.email,
      role: session.user.role,
    };

    // Cache valid session in memory for 10 seconds
    this.sessionCache.set(tokenHash, {
      data: result,
      expiresAt: Date.now() + 10_000,
    });

    return result;
  }

  async logout(token: string): Promise<void> {
    const tokenHash = this.hashToken(token);
    this.sessionCache.delete(tokenHash);
    await this.prisma.session.deleteMany({ where: { tokenHash } });
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Pengguna tidak ditemukan');
    return this.toPublicUser(user);
  }

  async updateProfile(userId: string, data: { name?: string; email?: string; phone?: string; bio?: string }) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...(data.name !== undefined && { name: data.name.trim() }),
          ...(data.email !== undefined && { email: data.email.trim().toLowerCase() }),
          ...(data.phone !== undefined && { phone: data.phone.trim() }),
          ...(data.bio !== undefined && { bio: data.bio.trim() }),
        },
      });
      return this.toPublicUser(user);
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') {
        throw new ConflictException('Email sudah terdaftar');
      }
      throw error;
    }
  }
}
