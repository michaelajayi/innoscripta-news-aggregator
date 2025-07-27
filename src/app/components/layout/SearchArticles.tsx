import useDebounce from "@/lib/hooks/useDebounce";
import { INewsApiSearchResponse } from "@/lib/types/articles.interface";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import Article from "./Article";
import { useArticleSearch } from "@/lib/hooks/useArticlesHooks";
import { IoMdInformationCircleOutline } from "react-icons/io";

const SearchArticle = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // debounce the search query with 500ms delay
  const debouncedSearchQuery = useDebounce(searchQuery.trim(), 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const { data, isLoading, refetch } = useArticleSearch({
    q: debouncedSearchQuery,
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

  // if (
  //   !searchResult ||
  //   searchResult.status === "error" ||
  //   !searchResult.articles
  // ) {
  //   console.log("No result");
  // }

  return (
    <div className="w-full max-w-4xl mx-auto pt-5">
      <div className="flex flex-col space-y-1 p-5 rounded-sm">
        {debouncedSearchQuery && (
          <div className="text-5xl text-gray-600 capitalize my-5">
            {debouncedSearchQuery}
          </div>
        )}

        <div className="flex flex-col space-y-2 items-start w-full">
          <form
            className="flex flex-col space-y-3 my-5 bg-white p-5 w-full"
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
          <div className="flex space-x-2 items-center">
            <IoMdInformationCircleOutline />
            <small className="text-gray-500 text-center">
              Select news sources from the sidebar to see filtered articles
              here.
            </small>
          </div>
        </div>

        {/* search result */}
        {/* {isLoading ? (
          <p>Searching...</p>
        ) : (
          <div className="flex flex-col space-y-10">
            {searchResult?.articles &&
              searchResult.articles.length > 0 &&
              searchResult.articles.map((article, index) => (
                <Article article={article} key={index} />
              ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default SearchArticle;
