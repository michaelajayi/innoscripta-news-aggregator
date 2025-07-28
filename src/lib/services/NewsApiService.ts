import {
  INewsApiArticle,
  INewsApiResponse,
  INewsApiResult,
} from "../types/articles.interface";

export class NewsApiService {
  private apiKey: string;
  private baseUrl = "https://newsapi.org/v2";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    this.validateApiKey();

    const url = new URL(`${this.baseUrl}/${endpoint}`);

    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  }

  private buildHeaders(): HeadersInit {
    return {
      "X-Api-Key": this.apiKey,
    };
  }

  private async makeRequest(
    endpoint: string,
    params: Record<string, string> = {},
  ): Promise<INewsApiResult> {
    const url = this.buildUrl(endpoint, params);
    const headers = this.buildHeaders();

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      this.handleApiError(response);
    }

    return response.json();
  }

  private handleApiError(response: Response): never {
    throw new Error(
      `NewsAPI error: ${response.status} - ${response.statusText}`,
    );
  }

  private validateApiKey(): void {
    if (!this.apiKey) {
      throw new Error("API key is required");
    }
  }

  async getSources() {
    return this.makeRequest("top-headlines/sources");
  }
  
  // async getCategories() {
  //   return this.makeRequest("top-headlines/category");
  // }

  async getAllArticles(params: { q: string }) {
    return this.makeRequest("top-headlines", {
      q: params?.q,
    });
  }

  async getTopHeadlines(params?: {
    country?: string;
    category?: string;
    sources?: string;
    q?: string;
  }) {
    return this.makeRequest("top-headlines", {
      ...(params?.country && { country: params.country }),
      ...(params?.category && { category: params.category }),
      ...(params?.sources && { sources: params.sources }),
    });
  }

  async filterArticles(params?: { sources?: string; category?: string }) {
    return this.makeRequest("top-headlines", {
      ...(params?.sources && { sources: params.sources }),
      ...(params?.category && { category: params.category }),
    });
  }

  async searchArticles(params: { q: string }) {
    return this.makeRequest("everything", {
      q: params.q,
    });
  }
}
