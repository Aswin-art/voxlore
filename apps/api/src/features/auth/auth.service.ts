import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private toPublicUser(user: PublicUser): PublicUser {
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  private signToken(user: PublicUser): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Email sudah terdaftar');

    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name.trim(),
          email,
          passwordHash: await bcrypt.hash(dto.password, 12),
        },
      });
      return { user: this.toPublicUser(user), accessToken: this.signToken(user) };
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') {
        throw new ConflictException('Email sudah terdaftar');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.trim().toLowerCase() },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Email atau kata sandi salah');
    }
    return { user: this.toPublicUser(user), accessToken: this.signToken(user) };
  }
}
