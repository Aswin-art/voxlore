import { Body, Controller, HttpCode, HttpStatus, Put, Req, UseGuards } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('security')
@UseGuards(JwtAuthGuard)
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Put('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Req() req: AuthenticatedRequest,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.securityService.changePassword(req.user.sub, dto);
  }
}
