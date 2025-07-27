import { NewsAPIOrgService } from "@/lib/services/NewsAPI";
import { useQuery } from "@tanstack/react-query";
import { INewsApiSourcesResponse } from "@/lib/types/articles.interface";

const apiOrgNewsService = new NewsAPIOrgService(
  process.env.NEXT_PUBLIC_NEWS_API_ORG_KEY!,
);

const ArticleSources = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["article-sources"],
    queryFn: () => apiOrgNewsService.getSources(),
  });

  console.log("data", data);

  if (isPending) return "Loading...";

  if (error) return "An error occured." + error.message;

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
