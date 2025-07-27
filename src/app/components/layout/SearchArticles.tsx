import useDebounce from "@/lib/hooks/useDebounce";
import { NewsApiService } from "@/lib/services/NewsApiService";
import { INewsApiSearchResponse } from "@/lib/types/articles.interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import ArticleSearchResult from "./ArticleSearchResult";

const newsApiService = new NewsApiService(
  process.env.NEXT_PUBLIC_NEWS_API_ORG_KEY!,
);

const SearchArticle = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // debounce the search query with 500ms delay
  const debouncedSearchQuery = useDebounce(searchQuery.trim(), 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const { isLoading, isPending, error, data, refetch } = useQuery({
    queryKey: debouncedSearchQuery
      ? ["articles-search", debouncedSearchQuery]
      : ["articles-search"],
    queryFn: () =>
      newsApiService.searchArticles({
        q: debouncedSearchQuery,
      }),
    enabled: false,
  });

  // Add these debug logs
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      refetch();
    }
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  const searchResult = data as INewsApiSearchResponse;

  if (
    !searchResult ||
    searchResult.status === "error" ||
    !searchResult.articles
  ) {
    console.log("No result");
  }

  return (
    <div className="w-full min-h-screen max-w-4xl px-20 py-10">
      {debouncedSearchQuery && (
        <div className="text-5xl text-gray-600 capitalize my-5">
          {debouncedSearchQuery}
        </div>
      )}

      <form
        className="flex flex-col space-y-3 my-5 max-2-5xl"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex space-x-2">
          <div className="w-full flex space-x-2 items-center rounded-md border border-gray-300 relative">
            <input
              type="text"
              name="search"
              value={searchQuery}
              placeholder="Search by keyword e.g. Apple"
              className="w-full h-full py-3 px-3 border-none outline-none"
              onChange={handleSearchChange}
            />
            {debouncedSearchQuery && (
              <div
                className="flex justify-center items-center absolute right-2 top-1/2 bottom-1/2 my-auto cursor-pointer"
                onClick={clearSearchQuery}
              >
                <MdCancel size={20} />
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="bg-black text-white py-3 px-5 rounded-md flex justify-center items-center border-none outline-none cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* search result */}
      {isLoading ? (
        <p>Searching...</p>
      ) : (
        <div className="flex flex-col space-y-10">
          {searchResult?.articles &&
            searchResult.articles.length > 0 &&
            searchResult.articles.map((article, index) => (
              <ArticleSearchResult article={article} key={index} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchArticle;
