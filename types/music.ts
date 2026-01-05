// types/music.ts
export interface Song {
  id: string;
  title: string;
  album: string;
  year: number;
  duration: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  isSingle?: boolean;
  featured?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  coverImage: string;
  genre: string;
  tracks: number;
  duration: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  amazonUrl: string;
  description: string;
  featuredTracks: string[];
}