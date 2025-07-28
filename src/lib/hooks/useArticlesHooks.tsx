import { useQuery } from '@tanstack/react-query';
import { NewsApiService } from '../services/NewsApiService';

interface IFilterArticleBySource {
  sources: string;
}

interface IFilterArticleByCategory {
  category: string;
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

export const useArticleFilter = (filters: IFilterArticleBySource, enabled=false) => {
  const hasFilters = !!filters.sources
  return useQuery({
    queryKey: ['source-filter', filters.sources],
    queryFn: () => newsApiService.filterArticles(filters),
    enabled: enabled && hasFilters,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export const useCategoryFilter = (filters: IFilterArticleByCategory, enabled=false) => {
  const hasFilters = !!filters.category;
  return useQuery({
    queryKey: ['category-filter', filters?.category],
    queryFn: () => newsApiService.filterArticlesByCategory({
      category: filters.category
    }),
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
