import { NewsApiService } from "@/lib/services/NewsApiService";
import { useQuery } from "@tanstack/react-query";
import { INewsApiSourcesResponse } from "@/lib/types/articles.interface";

const newsApiService = new NewsApiService(
  process.env.NEXT_PUBLIC_NEWS_API_ORG_KEY!,
);

const ArticleSources = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["article-sources"],
    queryFn: () => newsApiService.getSources(),
  });


  if (isLoading) return "Loading...";

  if (error) return (
    <div className="py-5">
      <p>An error occured - {error?.message}</p>
    </div>
  );

  // Type guard to check if data has sources property
  const sourcesData = data as INewsApiSourcesResponse;
  if (!sourcesData || sourcesData.status === "error" || !sourcesData.sources) {
    return "No sources available";
  }

  return (
    <div>
      <ul>
        {sourcesData.sources.map((source, index) => (
          <li key={index}>{source.name}</li>
        ))}
      </ul>
      <div>{isFetching ? "Updating" : ""}</div>
    </div>
  );
};

export default ArticleSources;
