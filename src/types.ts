export interface Release {
  id: number;
  ref: string;
  slug: string;
  artist: string;
  title: string;
  description?: string;
  discNumber: number;
  bandcampId: string;
  datePublished: string;
  dateModified: string;
  links?: Link;
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
