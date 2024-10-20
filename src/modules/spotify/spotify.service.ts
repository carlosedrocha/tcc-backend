import { Injectable } from '@nestjs/common';
const SpotifyWebApi = require('spotify-web-api-node');
@Injectable()
export class SpotifyService {
  private spotifyApi: any;

  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: 'http://localhost:3001', // ou outro URL que você configurou no Spotify Dashboard
    });
  }
  async onModuleInit() {
    await this.authenticate();
  }

  async authenticate(): Promise<void> {
    try {
      const data = await this.spotifyApi.clientCredentialsGrant();
      this.spotifyApi.setAccessToken(data.body['access_token']);
      this.spotifyApi.setRefreshToken(data.body['refresh_token']);
    } catch (error) {
      console.error('Error authenticating with Spotify API:', error);
    }
  }

  async getCurrentTrack(): Promise<any> {
    const track = await this.spotifyApi.getMyCurrentPlaybackState();
    console.log(track);
    return track.body;
  }

  async searchTracks(trackName: string): Promise<any> {
    const result = await this.spotifyApi.searchTracks(trackName);
    return result.body.tracks.items; // Retorna a lista de músicas encontradas
  }

  async addTrackToQueue(uri: string): Promise<any> {
    await this.spotifyApi.addToQueue(uri);
  }
}
