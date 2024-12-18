import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { SpotifyService } from './spotify.service';

import { isPublic } from 'src/common/decorators';
import { SimplifiedTrack } from './types/spotify/response-type-songs';
import { Public } from '@prisma/client/runtime/library';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('/search/:song')
  @isPublic()
  @HttpCode(HttpStatus.OK)
  async getMusic(@Param('song') song: string) {
    return await this.spotifyService.searchTracks(song);
  }

  @Post('queue')
  addMusic(@Body() track: SimplifiedTrack): void {
    this.spotifyService.addMusicToQueue(track);
  }

  @Get('/login')
  async login(@Res() res) {
    const authUrl = await this.spotifyService.getAuthUrl(); // Gera a URL de autenticação
    console.log(authUrl);
    res.send(authUrl); // Redireciona o cliente para essa URL
  }

  @Post('queue/like/:id')
  likeMusic(@Param('id') id: string): void {
    this.spotifyService.likeTrack(id);
  }
  @Post('/queue/clear')
  clearQueue() {
    this.spotifyService.clearQueue();
  }
  @Post('/queue/start')
  startQueue() {
    this.spotifyService.startQueue();
  }

  @Get('callback')
  @isPublic()
  async callback(@Query('code') code: string, @Res() res) {
    const token = await this.spotifyService.handleCallback(code);
    const redirectUrl = `http://localhost:3000/dashboard/queue-spotify?token=${token}`;
    res.redirect(redirectUrl);
  }

  @Get('queue')
  getQueue() {
    return this.spotifyService.getQueue();
  }
}
