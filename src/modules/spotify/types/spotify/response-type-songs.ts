export interface ResponseTypeSongs {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: MainType;
  uri: string;
}
export interface MusicInQueue {
  id: string; // ID único da música no Spotify
  name: string;
  albumName: string;
  durationMs: number;
  imageUrl: string;
  url: string;
  likes: number; // Contagem de likes
  addedAt: Date; // Data de adição à fila (para desempate em likes)
}

export interface SimplifiedTrack {
  id: string;
  name: string;
  albumName: string;
  durationMs: number;
  imageUrl: string;
  url: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = 'album',
  Single = 'single',
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = 'artist',
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = 'day',
  Year = 'year',
}

export interface ExternalIDS {
  isrc: string;
}

export enum MainType {
  Track = 'track',
}
