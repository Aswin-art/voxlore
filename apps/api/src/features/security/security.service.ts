import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../database/prisma.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class SecurityService {
  constructor(private readonly prisma: PrismaService) {}

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Pengguna tidak ditemukan');
    }

    const isMatch = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Kata sandi saat ini tidak cocok');
    }

    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException('Kata sandi baru tidak boleh sama dengan kata sandi lama');
    }

    const newPasswordHash = await bcrypt.hash(dto.newPassword, 12);

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });

    return {
      success: true,
      message: 'Kata sandi berhasil diperbarui',
    };
  }
}
