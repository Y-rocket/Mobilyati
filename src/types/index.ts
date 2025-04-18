export type UserRole = 
  | 'designer' 
  | 'producer' 
  | 'supplier' 
  | 'retailer' 
  | 'educational' 
  | 'government' 
  | 'student' 
  | 'development';

export type UserStatus = 'active' | 'pending' | 'inactive';

export type Language = 'en' | 'ar';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  profileComplete: boolean;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  type: UserRole;
  specialty?: string;
  description?: string;
  location?: string;
  experience?: number;
  institution?: string;
  website?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  images?: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOption {
  id: UserRole;
  label: string;
  count: number;
}

export interface Favorite {
  id: string;
  userId: string;
  profileId: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
}