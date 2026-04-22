export interface SiteConfig {
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  url?: string;
  github?: string;
}

export interface NowItem {
  emoji: string;
  text: string;
}
