interface IFilterByDateProps {
  dateFilter: string;
  updateDateFilter: (value: string) => void;
}

const FilterByDate = ({ dateFilter, updateDateFilter }: IFilterByDateProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateDateFilter(value);
  };
  return (
    <div className="bg-white p-3 rounded-sm shadow-xs flex flex-col space-y-1 items-start justify-start">
      <strong>
        <p className="text-black">Filter By Date</p>
      </strong>
      <div className="py-5 flex flex-col space-y-2">
        <div className="flex space-x-1 items-center cursor-pointer" onClick={() => updateDateFilter('newest')}>
          <input
            type="radio"
            name="dateFilter"
            value="newest"
            checked={dateFilter === "newest"}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
          <span>Newest first</span>
        </div>
        <div className="flex space-x-1 items-center cursor-pointer" onClick={() => updateDateFilter('oldest')}>
          <input
            type="radio"
            name="dateFilter"
            value="oldest"
            checked={dateFilter === "oldest"}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
          <span>Oldest first</span>
        </div>
      </div>
    </div>
  );
};

export default FilterByDate;
