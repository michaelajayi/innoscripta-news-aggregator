import { useQuery } from '@tanstack/react-query';
import { NewsApiService } from '../services/NewsApiService';

interface IFilterArticle {
  sources?: string;
  category?: string;
}

interface ISearchFilters {
  q: string;
}

const newsApiService = new NewsApiService(
  process.env.NEXT_PUBLIC_NEWS_API_ORG_KEY!
);

export const useArticleSources = () => {
  return useQuery({
    queryKey: ['article-sources'],
    queryFn: () => newsApiService.getSources(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// export const useArticleCategories = () => {
//   return useQuery({
//     queryKey: ['article-categories'],
//     queryFn: () => newsApiService.getCategories(),
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// }

export const useArticleFilter = (filters: IFilterArticle, enabled=false) => {
  const hasFilters = !!filters.sources || !!filters.category;
  return useQuery({
    queryKey: ['filter-article', filters?.sources, filters?.category],
    queryFn: () => newsApiService.filterArticles(filters),
    enabled: enabled && hasFilters,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export const useArticleSearch = (filters: ISearchFilters, enabled = false) => {
  return useQuery({
    queryKey: filters.q ? ["articles-search", filters.q] : ['articles-search'] ,
    queryFn: () => newsApiService.searchArticles(filters),
    enabled: enabled && !!filters.q.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useArticleSearchInitial = (filters: ISearchFilters, enabled = false) => {
  return useQuery({
    queryKey: filters.q ? ["articles-search", filters.q] : ['articles-search'] ,
    queryFn: () => newsApiService.searchArticles(filters),
  });
};
