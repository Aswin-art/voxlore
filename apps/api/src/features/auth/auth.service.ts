import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthStore, AuthUser } from './auth.store';
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
    private readonly store: AuthStore,
    private readonly jwtService: JwtService,
  ) {}

  private toPublicUser(user: AuthUser): PublicUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  private signToken(user: AuthUser): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async register(dto: RegisterDto) {
    const existing = this.store.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.store.create({
      name: dto.name,
      email: dto.email,
      password: hashed,
    });

    return {
      user: this.toPublicUser(user),
      accessToken: this.signToken(user),
    };
  }

  async login(dto: LoginDto) {
    const user = this.store.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Email atau kata sandi salah');
    }

    return {
      user: this.toPublicUser(user),
      accessToken: this.signToken(user),
    };
  }
}