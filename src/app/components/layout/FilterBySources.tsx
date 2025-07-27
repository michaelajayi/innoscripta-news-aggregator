import {
  INewsApiSource,
  INewsApiSourcesResponse,
} from "@/lib/types/articles.interface";
import MultiSelect from "./MultiSelect";
import { useArticleSources } from "@/lib/hooks/useArticlesHooks";

interface OptionType {
  value: string;
  label: string;
}

interface FilterBySourcesProps {
  selectedSources: OptionType[];
  onSourcesChange: (sources: OptionType[]) => void;
}

const FilterBySources = ({
  selectedSources,
  onSourcesChange,
}: FilterBySourcesProps) => {
  // Get article sources
  const {
    isLoading: isSourcesLoading,
    error: sourcesError,
    data: sourcesData,
    isFetching: isSourcesFetching,
  } = useArticleSources();

  const data = sourcesData as INewsApiSourcesResponse;
  const sourceOptions = data?.sources.map((source) => ({
    value: source.id,
    label: source.name,
  }));

  if (isSourcesLoading) return <div className="my-5">Loading...</div>;

  if (sourcesError)
    return (
      <div className="py-5">
        <p>An error occured - {sourcesError?.message}</p>
      </div>
    );

  return (
    <div className="bg-white p-3 rounded-sm shadow-xs">
      <p className="text-black">By sources</p>
      {isSourcesFetching ? (
        <p className="py-5">Updating...</p>
      ) : (
        <div className="py-5 flex flex-col space-y-2">
          <MultiSelect
            options={sourceOptions}
            placeholder="Select news sources..."
            onChange={onSourcesChange}
            value={selectedSources}
          />
        </div>
      )}
    </div>
  );
};

export default FilterBySources;
