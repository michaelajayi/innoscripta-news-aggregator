import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";

interface ISearchProps {
  isSearchLoading: boolean,
  searchError: Error | null;
  searchQuery: string;
  updateSearch: (q: string) => void;
  searchRefetch: () => void;
}

const SearchArticle = ({ isSearchLoading, searchError, searchQuery, updateSearch, searchRefetch }: ISearchProps) => {
  // debounce the search query with 500ms delay
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('I was clicked');
    searchRefetch();
  };
  
  const clearSearchQuery = () => {
    updateSearch("");
  };

  if (searchError) return <div>An error occured - {searchError?.message}</div>

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col space-y-1 p-5 rounded-sm">
        {searchQuery && (
          <div className="text-5xl text-gray-600 capitalize">
            {searchQuery}
          </div>
        )}

        <div className="flex flex-col space-y-1 items-start w-full">
          <form
            className="flex flex-col space-y-2  p-5 w-full"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-2">
              <div className="w-full flex items-center rounded-md border border-gray-300 relative focus:bg-white">
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  placeholder="Search by keyword e.g. Apple Vision Pro"
                  className="w-full h-full py-3 px-3 border-none outline-none focus:bg-white shadow-none rounded-md"
                  onChange={handleSearchChange}
                />
                {searchQuery && (
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
                  disabled={isSearchLoading || !searchQuery.trim()}
                  className="bg-black text-white py-3 px-5 rounded-md flex justify-center items-center border-none outline-none cursor-pointer hover:bg-black/80 w-full"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="hidden lg:flex space-x-2 items-center">
            <IoMdInformationCircleOutline />
            <small className="text-gray-500 text-center">
              Select news sources from the sidebar to see filtered articles
              here.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchArticle;
