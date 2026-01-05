// data/mockVideos.ts
import { MusicVideo, VideoPlaylist } from '@/types/video';

export const mockVideos: MusicVideo[] = [
  {
    id: '1',
    title: 'Honky Tonk Badonkadonk',
    description: 'Official music video for Trace Adkins\' hit single "Honky Tonk Badonkadonk" from the album "Songs About Me".',
    youtubeId: 'oGjw4hdFhLg',
    thumbnail: '/download.jpeg',
    duration: '4:07',
    releaseDate: '2005-08-15',
    views: '85M',
    album: 'Songs About Me',
    director: 'Michael Merriman',
    category: 'Official Video',
    featured: true
  },
  {
    id: '2',
    title: 'You\'re Gonna Miss This',
    description: 'Official music video for the emotional hit single "You\'re Gonna Miss This" which reached #1 on Billboard Hot Country Songs.',
    youtubeId: 'gNQR3eD-NAI',
    thumbnail: '/download (2).jpeg',
    duration: '3:49',
    releaseDate: '2008-02-04',
    views: '72M',
    album: 'American Man: Greatest Hits Volume II',
    director: 'Robert Deaton & George J. Flanigen IV',
    category: 'Official Video',
    featured: true
  },
  {
    id: '3',
    title: 'Ladies Love Country Boys',
    description: 'Official video for the hit single "Ladies Love Country Boys" from the album "Dangerous Man".',
    youtubeId: 'wUX2hx9kXko',
    thumbnail: '/download (3).jpeg',
    duration: '3:38',
    releaseDate: '2006-10-30',
    views: '58M',
    album: 'Dangerous Man',
    director: 'Trey Fanjoy',
    category: 'Official Video',
    featured: true
  },
  {
    id: '4',
    title: 'Just Fishin\'',
    description: 'Heartwarming music video featuring Trace and his daughter, showcasing a father-daughter fishing trip.',
    youtubeId: 'h9hGkYc6tqY',
    thumbnail: '/download (4).jpeg',
    duration: '3:45',
    releaseDate: '2011-07-11',
    views: '42M',
    album: 'Proud to Be Here',
    director: 'Peter Zavadil',
    category: 'Official Video',
    featured: false
  },
  {
    id: '5',
    title: 'Every Light in the House',
    description: 'Trace Adkins\' debut single and video that launched his career, featuring his signature deep voice.',
    youtubeId: 'ZP31VNp5dAU',
    thumbnail: '/download (5).jpeg',
    duration: '3:02',
    releaseDate: '1996-09-23',
    views: '25M',
    album: 'Dreamin\' Out Loud',
    director: 'Marc Ball',
    category: 'Official Video',
    featured: false
  },
  {
    id: '6',
    title: 'Hillbilly Bone (with Blake Shelton)',
    description: 'Duet with Blake Shelton that won the CMA Award for Musical Event of the Year in 2010.',
    youtubeId: 's0l6a9yO-yU',
    thumbnail: '/images.jpeg',
    duration: '3:42',
    releaseDate: '2009-11-09',
    views: '38M',
    album: 'Hillbilly Bone',
    director: 'Roman White',
    category: 'Official Video',
    featured: false
  },
  {
    id: '7',
    title: 'Muddy Water - Live at the Grand Ole Opry',
    description: 'Powerful live performance of "Muddy Water" at the historic Grand Ole Opry.',
    youtubeId: 'E_1xTj-MY_k',
    thumbnail: '/download (5).jpeg',
    duration: '4:18',
    releaseDate: '2018-06-15',
    views: '12M',
    album: 'The Way I Wanna Go',
    director: 'Grand Ole Opry',
    category: 'Live Performance',
    featured: false
  },
  {
    id: '8',
    title: 'Arlington - Tribute Performance',
    description: 'Emotional performance of "Arlington", a tribute to fallen soldiers, at a military appreciation event.',
    youtubeId: 'vnURxXqFgNk',
    thumbnail: '/images (3).jpeg',
    duration: '5:22',
    releaseDate: '2015-05-25',
    views: '28M',
    album: 'Songs About Me',
    director: 'Michael Merriman',
    category: 'Live Performance',
    featured: true
  },
  {
    id: '9',
    title: 'All I Ask For Anymore - Lyric Video',
    description: 'Official lyric video for the heartfelt ballad "All I Ask For Anymore".',
    youtubeId: '3MFwPc_es9g',
    thumbnail: '/images (4).jpeg',
    duration: '3:52',
    releaseDate: '2009-12-01',
    views: '18M',
    album: 'X (Ten)',
    director: 'Capitol Nashville',
    category: 'Lyric Video',
    featured: false
  },
  {
    id: '10',
    title: 'Behind The Scenes: The Way I Wanna Go',
    description: 'Exclusive behind-the-scenes footage from the making of "The Way I Wanna Go" album and tour.',
    youtubeId: 'q2eZc6oNT_4',
    thumbnail: '/images (5).jpeg',
    duration: '8:15',
    releaseDate: '2021-09-14',
    views: '5.2M',
    album: 'The Way I Wanna Go',
    director: 'Mickey Jack Cones',
    category: 'Behind the Scenes',
    featured: false
  },
  {
    id: '11',
    title: 'Better Boat (feat. Keb\' Mo\')',
    description: 'Official music video for "Better Boat" featuring blues legend Keb\' Mo\', from the album "Something\'s Going On".',
    youtubeId: 'n2ff57h6W5c',
    thumbnail: '/images (6).jpeg',
    duration: '4:12',
    releaseDate: '2018-08-03',
    views: '15M',
    album: 'Something\'s Going On',
    director: 'Shaun Silva',
    category: 'Official Video',
    featured: false
  },
  {
    id: '12',
    title: 'Still a Soldier - Live on Fox & Friends',
    description: 'Special live performance of "Still a Soldier" for military appreciation on Fox & Friends.',
    youtubeId: 'XgHvF9TT9U8',
    thumbnail: '/images (7).jpeg',
    duration: '3:58',
    releaseDate: '2019-11-11',
    views: '9.8M',
    album: 'The Way I Wanna Go',
    director: 'Fox News',
    category: 'Live Performance',
    featured: false
  }
];

export const videoPlaylists: VideoPlaylist[] = [
  {
    id: '1',
    title: 'Greatest Hits Collection',
    description: 'All of Trace Adkins\' biggest hits and most popular music videos in one playlist.',
    thumbnail: '/download.jpeg',
    videos: mockVideos.slice(0, 6)
  },
  {
    id: '2',
    title: 'Live Performances',
    description: 'Powerful live performances from Grand Ole Opry, TV shows, and special events.',
    thumbnail: 'download (5).jpeg',
    videos: mockVideos.filter(v => v.category === 'Live Performance')
  },
  {
    id: '3',
    title: 'Emotional Ballads',
    description: 'Heartfelt and emotional songs showcasing Trace\'s storytelling abilities.',
    thumbnail: 'download (5).jpeg',
    videos: mockVideos.filter(v => ['You\'re Gonna Miss This', 'Arlington - Tribute Performance', 'Just Fishin\''].some(title => v.title.includes(title)))
  }
];