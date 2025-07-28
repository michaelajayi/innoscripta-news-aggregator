"use client";
import {
  useArticleFilter,
  useArticleSearch,
  useArticleSearchInitial,
} from "@/lib/hooks/useArticlesHooks";
import { useEffect, useState } from "react";
import FilterBySources from "../components/layout/FilterBySources";
import FilterByCategory from "../components/layout/FilterByCategory";
import FilteredArticles from "../components/layout/FilteredArticles";
import SearchArticle from "../components/layout/SearchArticles";
import useDebounce from "@/lib/hooks/useDebounce";
import {
  INewsApiArticle,
  INewsArticlesResponse,
} from "@/lib/types/articles.interface";
import TopCategories from "../components/layout/TopCategories";

interface OptionType {
  value: string;
  label: string;
}

const NewsAPIOrg = () => {
  const [selectedSources, setSelectedSources] = useState<OptionType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState<INewsApiArticle[] | null>(null);
  const [loadingText, setLoadingText] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);

  const debouncedSearchQuery = useDebounce(searchQuery.trim(), 500);

  // Filter articles based on selected sources
  const {
    isLoading: isFilterLoading,
    error: filterError,
    data: filterData,
    isFetching: isFilterFetching,
  } = useArticleFilter(
    {
      sources: selectedSources.map((s) => s.value).join(","),
    },
    selectedSources.length > 0,
  );
  
  // Filter articles based on selected categories
  const {
    isLoading: isCategoryLoading,
    data: categoryData,
    isFetching: isCategoryFetching,
  } = useArticleFilter(
    {
      category: selectedCategories.map((s) => s.value).join(","),
    },
    selectedSources.length > 0,
  );

  const {
    isLoading: isSearchLoading,
    error: searchError,
    data: searchData,
    refetch: searchRefetch,
    isFetching: isSearchFetching,
  } = useArticleSearch({
    q: debouncedSearchQuery,
  });

  const {
    isLoading: initialLoading,
    error: initialError,
    data: initialData,
    refetch: initialRefetch,
    isFetching: isInitialFetching,
  } = useArticleSearchInitial({
    q: "innoscripta",
  });

  useEffect(() => {
    if (isFilterLoading) {
      updateLoadingText();
    }

    const filterResponse = filterData as INewsArticlesResponse;
    const filteredData = filterResponse?.articles || [];
    if (filteredData && filteredData.length > 0) {
      setFiltered(filteredData);
      setTotalCount(filterResponse.totalResults);
    }
  }, [filterData]);

  useEffect(() => {
    const searchResponse = searchData as INewsArticlesResponse;
    const searchFiltered = searchResponse?.articles || [];

    if (isSearchLoading) {
      updateLoadingText();
    }

    if (searchFiltered && searchFiltered.length > 0) {
      setFiltered(searchFiltered);
      setTotalCount(searchResponse.totalResults);
    }
  }, [searchData]);

  useEffect(() => {
    const categoryResponse = categoryData as INewsArticlesResponse;
    const categoryFiltered = categoryResponse?.articles || [];

    if (isSearchLoading) {
      updateLoadingText();
    }

    if (categoryFiltered && categoryFiltered.length > 0) {
      setFiltered(categoryFiltered);
      setTotalCount(categoryResponse.totalResults);
    }
  }, [categoryData]);

  useEffect(() => {
    const initialResponse = initialData as INewsArticlesResponse;
    const initialFiltered = initialResponse?.articles || [];

    if (initialLoading) {
      updateLoadingText();
    }

    if (initialFiltered && initialFiltered.length > 0) {
      setFiltered(initialFiltered);
      setTotalCount(initialResponse.totalResults);
    }
  }, [initialData, initialLoading]);

  const handleSearchUpdate = (q: string) => {
    if (!q.trim()) {
      setFiltered(null);
      setTotalCount(0);
    }

    setSearchQuery(q);
  };

  const handleSourcesChange = (sources: OptionType[]) => {
    setSelectedSources(sources);
  };

  const handleCategoryChanges = (categories: OptionType[]) => {
    setSelectedCategories(categories);
    // console.log('selected', selectedCategories);
  };

  const updateLoadingText = () => {
    if (isSearchLoading) {
      setLoadingText("Searching...");
    } else if (isFilterLoading) {
      setLoadingText("Filtering from ");
    } else {
      setLoadingText("");
    }
  };

  return (
    <section className="min-h-screen flex">
      <div className="w-full lg:w-1/4 fixed left-0 top-0 h-full z-10 bg-gray-50">
        <section className="w-full h-full py-10">
          <div className="p-5 flex flex-col space-y-10 h-full">
            <h2 className="font-medium text-4xl text-black">News Aggregator</h2>
            <div className="flex flex-col space-y-10">
              <FilterBySources
                selectedSources={selectedSources}
                onSourcesChange={handleSourcesChange}
              />
              <FilterByCategory
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChanges}
              />
            </div>
          </div>
        </section>
      </div>
      <div className="w-full lg:w-3/4 lg:ml-[25%] min-h-screen overflow-y-auto">
        <div className="flex flex-col space-y-5">
          {/* categories */}
          <TopCategories />
          
          {/* Search field */}
          <SearchArticle
            isSearchLoading={isSearchLoading}
            searchError={searchError}
            searchQuery={searchQuery}
            updateSearch={handleSearchUpdate}
            searchRefetch={searchRefetch}
          />
          
          <FilteredArticles
            isLoading={
              isFilterLoading ||
              isFilterFetching ||
              isSearchLoading ||
              isSearchFetching ||
              initialLoading ||
              isInitialFetching || isCategoryFetching || isCategoryLoading
            }
            loadingText={loadingText}
            error={filterError}
            articles={filtered || []}
            count={totalCount}
            selectedSources={selectedSources}
          />
        </div>
      </div>
    </section>
  );
};

export default NewsAPIOrg;
