import { categoryOptions } from "@/lib/utils/constants";
import { useState } from "react";

interface ICategoryProps {
  category: string;
  updateCategory: (value: string) => void;
}

const TopCategories = ({ category, updateCategory }: ICategoryProps) => {
  const [showTopCategories, setShowTopCategories] = useState<boolean>(false);
  const handleSelect = (value: string) => {
    updateCategory(value);
  };
  
  return (
    <div className="hidden lg:flex w-full max-w-4xl mx-auto py-5 lg:py-10">
      <div className="w-full flex flex-col space-y-3 lg:space-y-0 lg:flex-row p-5 justify-start lg:justify-between items-start lg:items-center">
        {categoryOptions.map((category) => {
          const IconComponent = category?.icon;

          return (
            <div
              className="flex space-x-1 items-center cursor-pointer"
              key={category.value}
              onClick={() => handleSelect(category.value)}
            >
              {IconComponent && <IconComponent />}
              <p className="text-md text-black font-medium">{category.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCategories;
