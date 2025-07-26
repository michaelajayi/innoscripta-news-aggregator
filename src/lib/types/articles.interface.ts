export interface INewsSource {
  id: string;
  name: string;
  domain: string;
  category: string;
}

export type Category = 'general' | 'business'| 'entertainment' | 'health' |'science'| 'sports' | 'technology';
  
export interface IArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string | null;
  publishedAt: Date;
  source: INewsSource;
  category: Category;
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
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}