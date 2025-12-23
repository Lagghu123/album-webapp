export type ViewState = 'login' | 'dashboard' | 'album-detail' | 'sharing' | 'ui-kit' | 'memories' | 'admin';

export type SortOption = 'date-desc' | 'date-asc' | 'name-asc';
export type ViewMode = 'grid' | 'list';

export interface User {
  email: string;
  name: string;
  role: 'Admin' | 'User';
  avatar: string;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  width?: string;
  height?: string;
  type?: 'video' | 'image';
  duration?: string;
  likes?: number;
  comments?: number;
  date?: string;
  timestamp?: number;
  isFavorite?: boolean; // Added for favorite functionality
  camera?: string;
  location?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
}

export interface Album {
  id: string;
  title: string;
  cover: string;
  date: string;
  photosCount: number;
  shared?: boolean;
  private?: boolean;
  publicLink?: boolean;
  role?: 'Admin' | 'Contributor' | 'View Only';
}