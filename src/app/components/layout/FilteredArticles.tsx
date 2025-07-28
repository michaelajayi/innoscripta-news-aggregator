import {
  INewsApiArticle,
  INewsApiResult,
  INewsArticlesResponse,
} from "@/lib/types/articles.interface";
import Article from "./Article";

interface FilteredArticlesProps {
  isLoading: boolean;
  error: Error | null;
  articles: INewsApiArticle[] | undefined;
  count: number;
  loadingText: string;
  selectedSources: { value: string; label: string }[];
}

const FilteredArticles = ({
  isLoading,
  error,
  articles,
  count,
  loadingText,
  selectedSources,
}: FilteredArticlesProps) => {
  if (error) {
    return (
      <div className="w-full max-w-4xl px-10 mx-auto bg-white rounded-sm">
        <div className="text-red-500 text-center py-10">
          Error loading articles: {error.message}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl px-10 py-10 mx-auto bg-white rounded-sm">
        <div className="flex flex-col space-y-10">
          <div className="text-2xl text-gray-600">
            {loadingText}
            {selectedSources.map((s) => s.label).join(", ")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl px-10 py-10 mx-auto bg-white rounded-sm">
      {articles && articles.length > 0 ? (
        <div className="flex flex-col space-y-5">
          <div>
            <div className="text-2xl text-gray-600">
              <span>
                Found <strong>{count}</strong> Article
                {articles.length > 0 ? "s" : ""}{" "}
              </span>
              {selectedSources && selectedSources.length > 0 ? (
                <span>
                  for: {selectedSources.map((s) => s.label).join(", ")}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col space-y-10">
            {articles.map((article: INewsApiArticle, index: number) => (
              <Article article={article} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-gray-500">No articles found</p>
        </div>
      )}
    </div>
  );
};

export default FilteredArticles;
