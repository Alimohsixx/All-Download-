
export interface MediaItem {
  url: string;
  quality: string;
  extension: string;
  type: 'video' | 'image' | 'audio' | 'other';
}

export interface ApiResponse {
  url: string;
  source: string;
  author: string;
  title: string;
  thumbnail: string;
  duration: string;
  medias: MediaItem[];
}

export interface PlatformConfig {
  id: string;
  name: string;
  icon: string;
  color: string;
  url: string;
  enabled: boolean;
}

export interface SiteConfig {
  siteName: string;
  siteNameAccent: string;
  heroTitle: string;
  heroAccent: string;
  heroSubtitle: string;
  contactEmail: string;
  githubUrl: string;
  platforms: PlatformConfig[];
}
