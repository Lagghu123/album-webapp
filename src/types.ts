export type ViewState = 'login' | 'register' | 'dashboard' | 'album-detail' | 'sharing' | 'ui-kit' | 'memories' | 'admin';

export type SortOption = 'date-desc' | 'date-asc' | 'name-asc';
export type ViewMode = 'grid' | 'list';

export interface User {
  id: string; // Changed from email to UUID for DB
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
  isFavorite?: boolean; 
  camera?: string;
  location?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
  storage_path?: string; // For storage management
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
  owner_id?: string;
}