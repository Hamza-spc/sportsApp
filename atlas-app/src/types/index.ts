export type UserType = 'admin' | 'player' | 'special_user' | 'venue_hoster';

export interface User {
  id: string;
  email: string;
  username: string;
  userType: UserType;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  dateOfBirth: string;
  phoneNumber?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Player extends User {
  userType: 'player';
  favoriteSport: string;
  position?: string;
  age: number;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  followers: string[];
  following: string[];
}

export interface SpecialUser extends User {
  userType: 'special_user';
  specializations: string[];
  bio: string;
  certifications?: string[];
  experience: string;
}

export interface VenueHoster extends User {
  userType: 'venue_hoster';
  companyName?: string;
  venues: Venue[];
  isApproved: boolean;
}

export interface Admin extends User {
  userType: 'admin';
  permissions: string[];
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  sports: string[];
  matchFormats: MatchFormat[];
  amenities: string[];
  photos: string[];
  hosterId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MatchFormat {
  id: string;
  name: string;
  playerCount: number;
  sport: string;
  price?: number;
  duration: number; // in minutes
}

export interface SportEvent {
  id: string;
  title: string;
  description: string;
  sport: string;
  venueId: string;
  venue: Venue;
  matchFormat: MatchFormat;
  date: string;
  startTime: string;
  endTime: string;
  ageRange: {
    min: number;
    max: number;
  };
  gender: 'male' | 'female' | 'mixed';
  maxPlayers: number;
  currentPlayers: number;
  players: string[];
  creatorId: string;
  creator: Player;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FeedPost {
  id: string;
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  authorId: string;
  author: User;
  hashtags: string[];
  likes: string[];
  comments: Comment[];
  shares: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  eventId: string;
  event: SportEvent;
  playerId: string;
  player: Player;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  relatedId?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

