import { useState } from "react";
import Select, { MultiValue } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: OptionType[];
  placeholder?: string;
  onChange: (selectedOptions: OptionType[]) => void;
  value?: OptionType[];
  className?: string;
}

const MultiSelect = ({
  options,
  placeholder,
  onChange,
  value=[],
  className,
}: MultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>(value);

  const handleChange = (options: MultiValue<OptionType>) => {
    const newSelection = options as OptionType[];
    setSelectedOptions(newSelection); 
    onChange(newSelection);
  };

  return (
    <div className="w-full flex flex-col space-y-2 items-start">
      <Select<OptionType, true>
        isMulti
        options={options}
        value={selectedOptions}
        placeholder={placeholder}
        className={`basic-multi-select w-full ${className}`}
        onChange={handleChange}
      />
    </div>
  );
};

export default MultiSelect;
