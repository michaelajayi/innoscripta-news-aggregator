import { useQuery } from "@tanstack/react-query";
import { INewsApiSourcesResponse } from "@/lib/types/articles.interface";
import { NewsApiService } from "@/lib/services/NewsApiService";

const newsApiService = new NewsApiService(
  process.env.NEXT_PUBLIC_NEWS_API_ORG_KEY!,
);

const FilterBySources = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["article-sources"],
    queryFn: () => newsApiService.getSources(),
  });

  if (isLoading) return <div className="my-5">Loading...</div>;

  if (error) return "An error occured. " + error.message;

  const sources = data as INewsApiSourcesResponse;

  const noSourcesData =
    !sources || sources.status === "error" || !sources.sources;

  return (
    <div>
      <p className="text-black">By sources</p>
      {isFetching ? (
        <p className="py-5">Updating...</p>
      ) : (
        <ul className="h-full py-5">
          {!noSourcesData &&
            sources.sources.map((source, index) => (
              <li key={index} className="text-black">
                {source.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default FilterBySources;
