import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';

export interface AuthenticatedRequest extends Request {
  user: { sub: string; email: string; role: string };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractSessionToken(request);
    if (!token) throw new UnauthorizedException('Sesi tidak ditemukan');
    request.user = await this.authService.getSession(token);
    return true;
  }

  static extractSessionToken(request: Request): string | undefined {
    const cookie = request.headers.cookie
      ?.split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith('voxlore_session='));
    return cookie?.slice('voxlore_session='.length);
  }

  private extractSessionToken(request: Request): string | undefined {
    return JwtAuthGuard.extractSessionToken(request);
  }
}
