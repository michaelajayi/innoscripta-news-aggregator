"use client";
import {
  useArticleFilter,
  useArticleSearch,
  useCategoryFilter,
  useArticleSearchInitial,
} from "@/lib/hooks/useArticlesHooks";
import { useEffect, useState } from "react";
import FilterBySources from "../components/layout/FilterBySources";
import FilterByCategory from "../components/layout/FilterByCategory";
import FilterByDate from "../components/layout/FilterByDate";
import FilteredArticles from "../components/layout/FilteredArticles";
import SearchArticle from "../components/layout/SearchArticles";
import useDebounce from "@/lib/hooks/useDebounce";
import {
  INewsApiArticle,
  INewsArticlesResponse,
} from "@/lib/types/articles.interface";
import TopCategories from "../components/layout/TopCategories";
import Link from "next/link";
import { RiMenu2Fill, RiCloseLargeFill } from "react-icons/ri";
import { useMediaQuery } from 'react-responsive'

interface OptionType {
  value: string;
  label: string;
}

const NewsAPIOrg = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  
  const [selectedSources, setSelectedSources] = useState<OptionType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>(
    [],
  );
  const [singleCategory, setSingleCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState<INewsApiArticle[] | null>(null);
  const [loadingText, setLoadingText] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [dateFilter, setDateFilter] = useState("newest");
  const [showHamburger, setShowHamburger] = useState<boolean>(true);

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
  } = useCategoryFilter(
    {
      category: selectedCategories.map((s) => s.value).join(","),
    },
    selectedCategories.length > 0,
  );

  // Filter articles based on selected single categories
  const { data: singleCategoryData, isFetching: isSingleCategoryFetching } =
    useCategoryFilter(
      {
        category: singleCategory,
      },
      singleCategory.length > 0,
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
    data: initialData,
    isFetching: isInitialFetching,
  } = useArticleSearchInitial({
    q: "Apple Vision Pro",
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
    const categoryResponse = singleCategoryData as INewsArticlesResponse;
    const singleCategoryFiltered = categoryResponse?.articles || [];

    if (isSearchLoading) {
      updateLoadingText();
    }

    if (singleCategoryFiltered && singleCategoryFiltered.length > 0) {
      setFiltered(singleCategoryFiltered);
      setTotalCount(categoryResponse.totalResults);
    }
  }, [singleCategoryData]);

  useEffect(() => {
    if (dateFilter === "newest") {
      const filteredData =
        filtered &&
        filtered.sort(
          (a, b) =>
            new Date(b.publishedAt!).getTime() -
            new Date(a.publishedAt!).getTime(),
        );

      if (filteredData) {
        setFiltered(filteredData);
      }
    } else if (dateFilter === "oldest") {
      const filteredData =
        filtered &&
        filtered.sort(
          (a, b) =>
            new Date(a.publishedAt!).getTime() -
            new Date(b.publishedAt!).getTime(),
        );

      if (filteredData) {
        setFiltered(filteredData);
      }
    }
  }, [dateFilter, filtered]);

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
  };

  const updateLoadingText = () => {
    if (isSearchLoading) {
      setLoadingText("Searching...");
    } else if (isFilterLoading) {
      setLoadingText("Filtering: ");
    } else {
      setLoadingText("");
    }
  };

  return (
    <section className="w-screen h-full min-h-screen lg:flex">
      <div className="w-full lg:w-1/4 lg:fixed left-0 top-0 h-full z-10 bg-gray-50">
        <section className="lg:flex w-full h-full py-5 lg:py-10">
          <div className="p-5 flex flex-col space-y-10 h-full w-full">
            <div className="w-full flex justify-between items-center">
              <Link
                href="/"
                className="font-medium text-3xl lg:text-4xl text-black"
              >
                News Aggregator
              </Link>

              <div className="lg:hidden flex cursor-pointer">
                {!showHamburger ? (
                  <div onClick={() => setShowHamburger(!showHamburger)}>
                    <RiCloseLargeFill size={25} />
                  </div>
                ) : (
                  <div onClick={() => setShowHamburger(!showHamburger)}>
                    <RiMenu2Fill size={25} />
                  </div>
                )}
              </div>
            </div>

            {/* filter controls - show on desktop always, on mobile only when hamburger is toggled */}
            <div className={`w-full ${isMobile ? !showHamburger ? 'flex flex-col space-y-5' : 'hidden' : 'flex flex-col space-y-10'}`}>
                <FilterBySources
                  selectedSources={selectedSources}
                  onSourcesChange={handleSourcesChange}
                />
                <FilterByCategory
                  selectedCategories={selectedCategories}
                  onCategoryChange={handleCategoryChanges}
                />
                <FilterByDate
                  dateFilter={dateFilter}
                  updateDateFilter={(filter) => setDateFilter(filter)}
                />
              </div>
          </div>
        </section>
      </div>
      <div className="w-screen lg:w-3/4 lg:ml-[25%] min-h-screen overflow-y-auto">
        <div className="flex flex-col space-y-1">
          {/* categories */}
          <TopCategories
            category={singleCategory}
            updateCategory={(value: string) => setSingleCategory(value)}
          />

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
              isInitialFetching ||
              isCategoryFetching ||
              isCategoryLoading ||
              isSingleCategoryFetching
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
