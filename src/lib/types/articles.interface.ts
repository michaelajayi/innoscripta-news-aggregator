export interface INewsSource {
  id: string;
  name: string;
  domain: string;
  category: string;
}
  
export enum ECategory {
  GENERAL = "general",
  BUSINESS = "business",
  ENTERTAINMENT = "entertainment",
  HEALTH = "health",
  SCIENCE = "science",
  SPORTS = "sports",
  TECHNOLOGY = "technology"
}

export interface IArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string | null;
  publishedAt: Date;
  source: INewsSource;
  category: ECategory;
  author: string | null;
}

export interface INewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage?: string | null;
  imageUrl?: string | null;
  content: string;
  publishedAt?: Date | string | null;
}

export interface INewsArticlesResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: INewsApiArticle[];
}

export interface INewsApiErrorResponse {
  status: "error";
  code: string;
  message: string;
}

export interface INewsApiSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface INewsApiSourcesResponse {
  status: "ok" | "error";
  sources: INewsApiSource[];
}

export interface INewsApiSearch {
  source: {
    id: string,
    name: string
  },
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface INewsApiSearchResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: INewsApiSearch[]
}

export type INewsApiResponse = INewsApiSourcesResponse | INewsApiSearchResponse;

export type INewsApiResult = INewsApiResponse | INewsApiErrorResponse;
