// ==========================================================================
// Global Type Definitions
// ==========================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'visitor';
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  language: 'en' | 'bn';
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    events: boolean;
    newsletter: boolean;
  };
  accessibility: {
    reduceMotion: boolean;
    highContrast: boolean;
    largeFonts: boolean;
  };
}

// ==========================================================================
// Event Types
// ==========================================================================

export interface Event {
  id: string;
  title: string;
  titleBengali?: string;
  description: string;
  descriptionBengali?: string;
  date: string;
  endDate?: string;
  time: string;
  venue: Venue;
  category: EventCategory;
  image: string;
  gallery?: string[];
  organizers: string[];
  sponsors?: Sponsor[];
  ticketInfo: TicketInfo;
  rsvpCount: number;
  maxAttendees?: number;
  tags: string[];
  featured: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  culturalSignificance?: string;
  traditionalElements?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  capacity?: number;
  amenities?: string[];
}

export interface TicketInfo {
  free: boolean;
  prices?: {
    adult: number;
    minor: number;
    member: number;
    nonMember: number;
  };
  currency: string;
  deadline?: string;
  refundPolicy?: string;
  contactEmail: string;
  contactPhone?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export type EventCategory = 
  | 'durga-puja'
  | 'kali-puja' 
  | 'saraswati-puja'
  | 'poila-boishakh'
  | 'cultural-program'
  | 'picnic'
  | 'workshop'
  | 'charity'
  | 'community'
  | 'youth'
  | 'senior'
  | 'food-festival'
  | 'art-exhibition'
  | 'literature'
  | 'music'
  | 'dance'
  | 'other';

// ==========================================================================
// Content Types
// ==========================================================================

export interface Article {
  id: string;
  title: string;
  titleBengali?: string;
  slug: string;
  content: string;
  contentBengali?: string;
  excerpt: string;
  author: Author;
  category: ArticleCategory;
  tags: string[];
  featuredImage: string;
  gallery?: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  likes: number;
  featured: boolean;
  seoMeta: SEOMeta;
}

export interface Author {
  id: string;
  name: string;
  nameBengali?: string;
  bio: string;
  avatar: string;
  role: string;
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export type ArticleCategory = 
  | 'news'
  | 'culture'
  | 'history'
  | 'community'
  | 'events'
  | 'tradition'
  | 'food'
  | 'art'
  | 'literature'
  | 'music'
  | 'dance'
  | 'festival'
  | 'youth'
  | 'senior'
  | 'business'
  | 'education';

// ==========================================================================
// Magazine Types
// ==========================================================================

export interface Magazine {
  id: string;
  title: string;
  titleBengali?: string;
  year: number;
  volume?: number;
  issue?: number;
  coverImage: string;
  description: string;
  pdfUrl: string;
  pageCount: number;
  articles: MagazineArticle[];
  editors: Author[];
  contributors: Author[];
  publishedAt: string;
  downloads: number;
  featured: boolean;
}

export interface MagazineArticle {
  id: string;
  title: string;
  titleBengali?: string;
  author: Author;
  pageStart: number;
  pageEnd: number;
  category: ArticleCategory;
  abstract?: string;
}

// ==========================================================================
// Gallery Types
// ==========================================================================

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl: string;
  event?: Event;
  category: GalleryCategory;
  tags: string[];
  photographer?: string;
  uploadedAt: string;
  featured: boolean;
  likes: number;
  views: number;
  metadata: MediaMetadata;
}

export interface MediaMetadata {
  width: number;
  height: number;
  size: number;
  format: string;
  duration?: number; // for videos
  alt: string;
  caption?: string;
}

export type GalleryCategory =
  | 'events'
  | 'festivals'
  | 'cultural-programs'
  | 'community'
  | 'history'
  | 'art'
  | 'food'
  | 'traditions'
  | 'members'
  | 'venues';

// ==========================================================================
// Navigation & UI Types
// ==========================================================================

export interface NavItem {
  id: string;
  label: string;
  labelBengali?: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  featured?: boolean;
  external?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

// ==========================================================================
// API Response Types
// ==========================================================================

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: Pagination;
  meta?: Record<string, any>;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// ==========================================================================
// Form Types
// ==========================================================================

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category: 'general' | 'membership' | 'events' | 'volunteer' | 'sponsor';
}

export interface EventRSVP {
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  attendees: number;
  dietaryRestrictions?: string;
  specialRequests?: string;
  volunteerInterest?: boolean;
}

export interface MembershipForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  birthDate?: string;
  occupation?: string;
  interests: string[];
  volunteerInterest: boolean;
  referredBy?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// ==========================================================================
// Animation & Interaction Types
// ==========================================================================

export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
  repeat?: number;
  direction?: 'normal' | 'reverse' | 'alternate';
}

export interface ScrollRevealConfig extends AnimationConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// ==========================================================================
// Performance & Analytics Types
// ==========================================================================

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  custom?: Record<string, any>;
}

// ==========================================================================
// Utility Types
// ==========================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
