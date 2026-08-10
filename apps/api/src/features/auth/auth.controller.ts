import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import type { AuthenticatedRequest } from './auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

const SESSION_COOKIE = 'voxlore_session';
const SESSION_MAX_AGE = 15 * 60 * 1000;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.register(dto);
    this.setSessionCookie(response, result.token);
    return { user: result.user };
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(dto);
    this.setSessionCookie(response, result.token);
    return { user: result.user };
  }

  @Post('logout')
  async logout(@Req() request: AuthenticatedRequest, @Res({ passthrough: true }) response: Response) {
    const token = JwtAuthGuard.extractSessionToken(request);
    if (token) await this.authService.logout(token);
    response.clearCookie(SESSION_COOKIE, this.cookieOptions());
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() request: AuthenticatedRequest) {
    return this.authService.getProfile(request.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  updateMe(@Req() request: AuthenticatedRequest, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(request.user.sub, dto);
  }

  private cookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };
  }

  private setSessionCookie(response: Response, token: string) {
    response.cookie(SESSION_COOKIE, token, {
      ...this.cookieOptions(),
      maxAge: SESSION_MAX_AGE,
    });
  }
}
