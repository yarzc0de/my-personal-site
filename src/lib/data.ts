import type { SiteConfig, SocialLink, Project, NowItem } from "./types";

export const site: SiteConfig = {
  name: "YARZ",
  role: "Fullstack Developer",
  bio: "I make things on the internet. Sometimes they work, sometimes they're art. Mostly both.",
  email: "yarzcode@gmail.com",
  location: "Tangerang",
};

export const links: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/yarzc0de" },
  { label: "Twitter", url: "https://twitter.com/0xyarz" },
  { label: "Email", url: "mailto:yarzcode@gmail.com" },
];

export const projects: Project[] = [
  {
    title: "Shortlink",
    description: "URL shortener with multi-domain support and sponsor redirect rotation. Shorten links, track clicks, look cool.",
    stack: ["Next.js", "NextAuth", "Prisma", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yarzc0de/shortlink",
  },
  {
    title: "NexProxy",
    description: "AI proxy dashboard for juggling multiple AI accounts with round-robin load balancing. One dashboard to rule them all.",
    stack: ["FastAPI", "Next.js", "SQLAlchemy", "Playwright", "WebSocket"],
    github: "https://github.com/yarzc0de/nexproxy",
  },
  {
    title: "NailArt",
    description: "Nail salon management app with booking, loyalty program, and invoicing. Making nails pretty, one appointment at a time.",
    stack: ["Next.js", "Prisma", "SQLite", "NextAuth", "PandaCSS"],
  },
];

export const now: NowItem[] = [
  { emoji: "🔨", text: "Building weird side projects" },
  { emoji: "📖", text: "Learning Go" },
  { emoji: "🎧", text: "Listening to Nujabes" },
  { emoji: "☕", text: "Drinking too much coffee" },
];
