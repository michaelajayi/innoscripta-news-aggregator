"use client";
import { useState } from "react";
import FilterBySources from "../components/layout/FilterBySources";
import FilteredArticles from "../components/layout/FilteredArticles";
import { useArticleFilter } from "@/lib/hooks/useArticlesHooks";
import SearchArticle from "../components/layout/SearchArticles";

interface OptionType {
  value: string;
  label: string;
}

const NewsAPIOrg = () => {
  const [selectedSources, setSelectedSources] = useState<OptionType[]>([]);

  // Filter articles based on selected sources
  const {
    isLoading: isFilterLoading,
    error: filterError,
    data: filterData,
    isFetching: isFilterFetching,
    refetch: refetchFilter,
  } = useArticleFilter(
    {
      sources: selectedSources.map((s) => s.value).join(","),
    },
    selectedSources.length > 0,
  );

  const handleSourcesChange = (sources: OptionType[]) => {
    setSelectedSources(sources);
  };

  return (
    <section className="min-h-screen flex">
      <div className="w-full lg:w-1/4 fixed left-0 top-0 h-full z-10 bg-gray-50">
        <section className="w-full h-full py-10">
          <div className="p-5 flex flex-col space-y-10 h-full">
            <h2 className="font-medium text-4xl text-black">News Aggregator</h2>
            <FilterBySources
              selectedSources={selectedSources}
              onSourcesChange={handleSourcesChange}
            />
          </div>
        </section>
      </div>
      <div className="w-full lg:w-3/4 lg:ml-[25%] min-h-screen overflow-y-auto">
        <div className="flex flex-col space-y-5">
          <SearchArticle />
          <FilteredArticles
            isLoading={isFilterLoading || isFilterFetching}
            error={filterError}
            data={filterData}
            selectedSources={selectedSources}
          />
        </div>
      </div>
    </section>
  );
};

export default NewsAPIOrg;
