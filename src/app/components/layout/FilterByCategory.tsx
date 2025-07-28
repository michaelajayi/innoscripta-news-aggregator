import MultiSelect from "./MultiSelect";
// import { useArticleCategories, useArticleSources } from "@/lib/hooks/useArticlesHooks";
import { categoryOptions } from "@/lib/utils/constants";

interface OptionType {
  value: string;
  label: string;
}

interface FilterByCategoryProps {
  selectedCategories: OptionType[];
  onCategoryChange: (sources: OptionType[]) => void;
}

const FilterByCategory = ({
  selectedCategories,
  onCategoryChange,
}: FilterByCategoryProps) => {
  return (
    <div className="bg-white p-3 rounded-sm shadow-xs">
      <strong>
        <p className="text-black">By categories</p>
      </strong>
      {false ? (
        <p className="py-5">Updating...</p>
      ) : (
        <div className="py-5 flex flex-col space-y-2">
          <MultiSelect
            options={categoryOptions}
            placeholder="Select news category..."
            onChange={onCategoryChange}
            value={selectedCategories}
          />
        </div>
      )}
    </div>
  );
};

export default FilterByCategory;
