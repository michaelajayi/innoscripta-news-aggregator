import {
  INewsApiArticle,
  INewsApiResult,
  INewsArticlesResponse,
} from "@/lib/types/articles.interface";
import Article from "./Article";

interface FilteredArticlesProps {
  isLoading: boolean;
  error: Error | null;
  data: INewsApiResult | undefined;
  selectedSources: { value: string; label: string }[];
}

const FilteredArticles = ({
  isLoading,
  error,
  data,
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
            Filtering articles from:{" "}
            {selectedSources.map((s) => s.label).join(", ")}
          </div>
        </div>
      </div>
    );
  }

  const articlesResponse = data as INewsArticlesResponse;
  const articles = articlesResponse?.articles || [];
  
  console.log('articles', articles);
  console.log(articles.length);

  return (
    <div className="w-full max-w-4xl px-10 py-10 mx-auto bg-white rounded-sm">
      {articles.length > 0 ? (
        <div className="flex flex-col space-y-5">
          <div>
            {selectedSources.length > 0 && (
              <div className="text-2xl text-gray-600">
                Found <strong>{articlesResponse.totalResults}</strong> Article
                {articles.length > 0 ? "s" : ""} from:{" "}
                {selectedSources.map((s) => s.label).join(", ")}
              </div>
            )}
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
