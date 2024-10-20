import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('/:song')
  @HttpCode(HttpStatus.OK)
  async getMusic(@Param('song') song: string) {
    return await this.spotifyService.searchTracks(song);
  }
}
