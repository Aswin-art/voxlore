import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/auth.guard';
import { UpdateProfileInfoDto } from './dto/update-profile-info.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  getProfile(@Req() req: AuthenticatedRequest) {
    return this.profileService.getProfile(req.user.sub);
  }

  @Put('me')
  updateProfile(@Req() req: AuthenticatedRequest, @Body() dto: UpdateProfileInfoDto) {
    return this.profileService.updateProfile(req.user.sub, dto);
  }
}
