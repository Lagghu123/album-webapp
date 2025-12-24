export type ViewState = 'login' | 'register' | 'dashboard' | 'album-detail' | 'sharing' | 'ui-kit' | 'memories' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'User';
  avatar: string;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  date?: string;
  timestamp?: number;
  isFavorite?: boolean;
}

export interface Album {
  id: string;
  title: string;
  cover: string;
  date: string;
  photosCount: number;
  private?: boolean;
  owner_id?: string;
}