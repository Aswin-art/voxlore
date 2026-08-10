import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ScanService } from './scan.service';
import { ScanQrDto } from './dto/scan-qr.dto';

@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async scanQr(@Body() dto: ScanQrDto) {
    return this.scanService.processScan(dto);
  }
}
