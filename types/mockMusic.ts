// data/mockMusic.ts
import { Album, Song } from '@/types/music';

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'ONE MORE CHRISTMAS',
    artist: 'TRACE ADKINS',
    year: 2023,
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800',
    genre: 'Country, Christmas',
    tracks: 12,
    duration: '45:22',
    spotifyUrl: 'https://open.spotify.com/album/trace-adkins-one-more-christmas',
    appleMusicUrl: 'https://music.apple.com/us/album/one-more-christmas/id',
    amazonUrl: 'https://www.amazon.com/One-More-Christmas-Trace-Adkins/dp/',
    description: 'A heartfelt Christmas album featuring traditional carols and original holiday songs, showcasing Trace Adkins\' deep baritone voice in a seasonal setting.',
    featuredTracks: ['One More Christmas', 'Silent Night', 'Christmas in the Country']
  },
  {
    id: '2',
    title: 'GOT IT DOWN',
    artist: 'TRACE ADKINS',
    year: 2022,
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800',
    genre: 'Country, Rock',
    tracks: 10,
    duration: '38:45',
    spotifyUrl: 'https://open.spotify.com/album/trace-adkins-got-it-down',
    appleMusicUrl: 'https://music.apple.com/us/album/got-it-down/id',
    amazonUrl: 'https://www.amazon.com/Got-It-Down-Trace-Adkins/dp/',
    description: 'An energetic album blending traditional country with rock influences, featuring powerful vocals and memorable hooks.',
    featuredTracks: ['Got It Down', 'Country Strong', 'Backroad Freedom']
  },
  {
    id: '3',
    title: 'WHEN THE COUNTRY GIRLS AT',
    artist: 'TRACE ADKINS',
    year: 2021,
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800',
    genre: 'Country',
    tracks: 11,
    duration: '42:18',
    spotifyUrl: 'https://open.spotify.com/album/trace-adkins-when-the-country-girls-at',
    appleMusicUrl: 'https://music.apple.com/us/album/when-the-country-girls-at/id',
    amazonUrl: 'https://www.amazon.com/When-Country-Girls-Trace-Adkins/dp/',
    description: 'A celebration of country life and love, featuring storytelling lyrics and authentic country instrumentation.',
    featuredTracks: ['When the Country Girls At', 'Dirt Road Diary', 'Small Town Saturday Night']
  },
  {
    id: '4',
    title: 'A COUNTRY GOT OAK BURYNE',
    artist: 'TRACE ADKINS',
    year: 2020,
    coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800',
    genre: 'Country, Americana',
    tracks: 9,
    duration: '36:52',
    spotifyUrl: 'https://open.spotify.com/album/trace-adkins-a-country-got-oak-buryne',
    appleMusicUrl: 'https://music.apple.com/us/album/a-country-got-oak-buryne/id',
    amazonUrl: 'https://www.amazon.com/Country-Got-Oak-Buryne-Adkins/dp/',
    description: 'A raw and authentic country album paying homage to traditional country roots with modern production.',
    featuredTracks: ['Oak Buryne', 'Whiskey River', 'Last Call']
  },
  {
    id: '5',
    title: 'THE WAY I WANNA GO',
    artist: 'TRACE ADKINS',
    year: 2019,
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800',
    genre: 'Country',
    tracks: 14,
    duration: '52:34',
    spotifyUrl: 'https://open.spotify.com/album/trace-adkins-the-way-i-wanna-go',
    appleMusicUrl: 'https://music.apple.com/us/album/the-way-i-wanna-go/id',
    amazonUrl: 'https://www.amazon.com/Way-Wanna-Go-Trace-Adkins/dp/',
    description: 'A reflective album about life, love, and the journey, featuring some of Adkins\' most personal songwriting.',
    featuredTracks: ['The Way I Wanna Go', 'Still Here', 'Miles Behind Me']
  },
  {
    id: '6',
    title: 'SOMETHING\'S GOING ON',
    artist: 'TRACE ADKINS',
    year: 2017,
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800',
    genre: 'Country, Blues',
    tracks: 12,
    duration: '44:15',
    spotifyUrl: 'https://open.spotify.com/album/trace-adkins-somethings-going-on',
    appleMusicUrl: 'https://music.apple.com/us/album/somethings-going-on/id',
    amazonUrl: 'https://www.amazon.com/Somethings-Going-On-Trace-Adkins/dp/',
    description: 'A blues-infused country album exploring themes of change, resilience, and celebration.',
    featuredTracks: ['Something\'s Going On', 'Better Boat', 'Watered Down']
  }
];

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Honky Tonk Badonkadonk',
    album: 'Songs About Me',
    year: 2005,
    duration: '4:02',
    spotifyUrl: 'https://open.spotify.com/track/trace-adkins-honky-tonk-badonkadonk',
    appleMusicUrl: 'https://music.apple.com/us/song/honky-tonk-badonkadonk/id',
    youtubeUrl: 'https://www.youtube.com/watch?v=honky-tonk-badonkadonk',
    featured: true
  },
  {
    id: '2',
    title: 'You\'re Gonna Miss This',
    album: 'American Man: Greatest Hits Volume II',
    year: 2008,
    duration: '3:44',
    spotifyUrl: 'https://open.spotify.com/track/trace-adkins-youre-gonna-miss-this',
    appleMusicUrl: 'https://music.apple.com/us/song/youre-gonna-miss-this/id',
    youtubeUrl: 'https://www.youtube.com/watch?v=youre-gonna-miss-this',
    featured: true
  },
  {
    id: '3',
    title: 'Ladies Love Country Boys',
    album: 'Dangerous Man',
    year: 2006,
    duration: '3:35',
    spotifyUrl: 'https://open.spotify.com/track/trace-adkins-ladies-love-country-boys',
    appleMusicUrl: 'https://music.apple.com/us/song/ladies-love-country-boys/id',
    youtubeUrl: 'https://www.youtube.com/watch?v=ladies-love-country-boys'
  },
  {
    id: '4',
    title: 'Every Light in the House',
    album: 'Dreamin\' Out Loud',
    year: 1996,
    duration: '2:58',
    spotifyUrl: 'https://open.spotify.com/track/trace-adkins-every-light-in-the-house',
    appleMusicUrl: 'https://music.apple.com/us/song/every-light-in-the-house/id',
    youtubeUrl: 'https://www.youtube.com/watch?v=every-light-in-the-house'
  },
  {
    id: '5',
    title: 'Just Fishin\'',
    album: 'Proud to Be Here',
    year: 2011,
    duration: '3:30',
    spotifyUrl: 'https://open.spotify.com/track/trace-adkins-just-fishin',
    appleMusicUrl: 'https://music.apple.com/us/song/just-fishin/id',
    youtubeUrl: 'https://www.youtube.com/watch?v=just-fishin'
  },
  {
    id: '6',
    title: 'Empty Chair',
    album: 'Empty Chair',
    year: 2022,
    duration: '4:15',
    spotifyUrl: 'https://open.spotify.com/track/trace-adkins-empty-chair',
    appleMusicUrl: 'https://music.apple.com/us/song/empty-chair/id',
    youtubeUrl: 'https://www.youtube.com/watch?v=empty-chair',
    isSingle: true
  }
];