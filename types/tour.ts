// types/tour.ts
export interface TourEvent {
  id: string;
  date: string;  
  formattedDate: string;  
  city: string;
  state: string;
  venue: string;
  location: string;  
  venueImage: string;
  ticketLink: string;
  vipLink?: string;
  status: 'upcoming' | 'past' | 'cancelled';
  featured: boolean;
  hasVip: boolean;
}