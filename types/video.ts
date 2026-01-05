// types/video.ts
export interface MusicVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  releaseDate: string;
  views: string;
  album?: string;
  director: string;
  category: 'Official Video' | 'Live Performance' | 'Lyric Video' | 'Behind the Scenes';
  featured: boolean;
}

export interface VideoPlaylist {
  id: string;
  title: string;
  description: string;
  videos: MusicVideo[];
  thumbnail: string;
}