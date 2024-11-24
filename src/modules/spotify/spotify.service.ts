import { Injectable } from '@nestjs/common';
import {
  MusicInQueue,
  SimplifiedTrack,
} from './types/spotify/response-type-songs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SpotifyWebApi = require('spotify-web-api-node');

@Injectable()
export class SpotifyService {
  private spotifyApi: any;
  private musicQueue: MusicInQueue[] = [];

  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: 'http://localhost:3333/api/spotify/callback', // URL para o redirect após autenticação
    });
  }

  // Gera a URL de autenticação para o Spotify
  async getAuthUrl() {
    try {
      const scopes = [
        'streaming',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
      ];

      const authUrl = this.spotifyApi.createAuthorizeURL(scopes);
      console.log('URL de autenticação gerada:', authUrl);
      return authUrl;
    } catch (error) {
      console.log(error);
    }
  }

  // Autentica o usuário e troca o código pelo token de acesso
  async handleCallback(code: string): Promise<void> {
    try {
      console.log(code);
      const data = await this.spotifyApi.authorizationCodeGrant(code);
      const accessToken = data.body['access_token'];
      const refreshToken = data.body['refresh_token'];
      console.log(data);
      this.spotifyApi.setAccessToken(accessToken);
      this.spotifyApi.setRefreshToken(refreshToken);
      return accessToken;
    } catch (error) {
      console.error('Erro ao obter o token de acesso:', error);
    }
  }

  // Refresh do token
  async refreshToken(): Promise<void> {
    try {
      const data = await this.spotifyApi.refreshAccessToken();
      const accessToken = data.body['access_token'];
      this.spotifyApi.setAccessToken(accessToken);
      console.log('Token de acesso renovado:', accessToken);
    } catch (error) {
      console.error('Erro ao renovar o token de acesso:', error);
    }
  }

  async searchTracks(trackName: string): Promise<SimplifiedTrack[]> {
    try {
      if (!trackName || trackName.trim() === '') {
        throw new Error('Search query cannot be empty');
      }

      const result = await this.spotifyApi.searchTracks(trackName);
      const tracks = result.body.tracks.items;

      // Mapeia os dados retornados para o formato simplificado
      return tracks.slice(0, 5).map((track) => ({
        id: track.id,
        name: track.name,
        albumName: track.album.name,
        durationMs: track.duration_ms,
        imageUrl:
          track.album.images.length > 0 ? track.album.images[0].url : null,
        url: track.external_urls.spotify, // URL pública da música no Spotify
      }));
    } catch (error) {
      console.error('Erro ao buscar músicas:', error);
      return [];
    }
  }

  startQueue() {
    console.log('Iniciando verificação de fila...');
    this.setupPlaybackCheck();
  }

  async addMusicToSpotifyQueue(trackUri: string): Promise<void> {
    try {
      await this.spotifyApi.addToQueue(trackUri);
      console.log(`Música adicionada à fila do Spotify: ${trackUri}`);
    } catch (error) {
      console.error('Erro ao adicionar à fila do Spotify:', error);
    }
  }

  async addMusicToQueue(track: SimplifiedTrack): Promise<void> {
    const newMusic: MusicInQueue = {
      id: track.id,
      name: track.name,
      albumName: track.albumName,
      durationMs: track.durationMs,
      imageUrl: track.imageUrl,
      url: track.url,
      likes: 0, // Inicia com 0 likes
      addedAt: new Date(), // Registra a data e hora de adição
    };

    this.musicQueue.push(newMusic);
    this.reorderQueue();
  }

  private reorderQueue(): void {
    this.musicQueue.sort((a, b) => {
      if (a.likes === b.likes) {
        return a.addedAt.getTime() - b.addedAt.getTime();
      }
      return b.likes - a.likes;
    });
  }

  likeTrack(trackId: string): void {
    const track = this.musicQueue.find((t) => t.id === trackId);
    if (track) {
      track.likes += 1;
      this.reorderQueue();
    }
  }

  async playNextInQueue(): Promise<void> {
    if (this.musicQueue.length > 0) {
      const nextTrack = this.musicQueue[0];
      await this.addMusicToSpotifyQueue(nextTrack.url);
      this.musicQueue.shift();
    } else {
      console.log('A fila está vazia');
    }
  }

  clearQueue(): void {
    this.musicQueue = [];
  }

  getQueue(): MusicInQueue[] {
    return this.musicQueue;
  }

  private setupPlaybackCheck() {
    setInterval(async () => {
      const playbackState = await this.spotifyApi.getMyCurrentPlaybackState();
      if (playbackState.body && playbackState.body.is_playing === false) {
        await this.playNextInQueue();
      }
    }, 5000);
  }
}
