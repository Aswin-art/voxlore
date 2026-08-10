import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadTrackDto } from './dto/download-track.dto';

@Controller('downloads')
export class DownloadsController {
  constructor(private readonly downloadsService: DownloadsService) {}

  @Get()
  getAvailableDownloads() {
    return this.downloadsService.getAvailableDownloads();
  }

  @Post('prepare')
  @HttpCode(HttpStatus.OK)
  getTrackForOffline(@Body() dto: DownloadTrackDto) {
    return this.downloadsService.getTrackForOffline(dto);
  }
}
