export interface Artist {
  id: number;
  slug: string;
  name: string;
  url: string;
  description: string;
  categories: Category[];
  relationships?: {
    proojects?: Prooject[];
    releases?: Release[];
  };
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  icon: string;
}

export interface Link {
  url: string;
  platform: Platform;
}

export interface Platform {
  name: string;
  url: string;
  slug: string;
}

export interface Prooject {
  id: number;
  slug: string;
  title: string;
  bandcampId: number;
  description: string;
  concept: string;
  tracks: Track[];
  createdAt: string;
  updatedAt: string;
}

export interface Release {
  id: number;
  ref: string;
  slug: string;
  artist: string;
  title: string;
  description?: string;
  discNumber: number;
  bandcampId: string;
  createdAt: string;
  updatedAt: string;
  tracks: Track[];
  links: Link[];
}

export interface Track {
  position: string;
  bonus: boolean;
  artist: string;
  title: string;
  url?: string;
  date: string;
  info: { content: string };
}
