import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/auth.guard';
import { SubscribePackageDto } from './dto/subscribe-package.dto';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  getAllPackages() {
    return this.packagesService.getAllPackages();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-subscription')
  getMySubscription(@Req() req: AuthenticatedRequest) {
    return this.packagesService.getMySubscription(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  subscribe(@Req() req: AuthenticatedRequest, @Body() dto: SubscribePackageDto) {
    return this.packagesService.subscribe(req.user.sub, dto);
  }
}
