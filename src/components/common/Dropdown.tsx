import React from 'react';

interface DropdownOption {
  id: string;
  name: string;
}

interface DropdownProps {
  options: DropdownOption[]; // 드롭다운에 표시할 옵션 배열
  onChange: (value: string | string[] | number) => void;
  placeholder?: string;
  required?: boolean;
  multiple?: boolean; // 다중 선택 가능 여부
  selectedValues?: string[]; // 다중 선택일 경우 선택된 값들
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 너비를 위한 프롭
  disabled?: boolean;
}

const Dropdown = ({
  options,
  onChange,
  placeholder = '',
  required = false,
  multiple = false,
  selectedValues = [],
  width = 'xs',
  disabled = false,
}: DropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = multiple
      ? Array.from(e.target.selectedOptions, (option) => option.value)
      : e.target.value;
    if (onChange) {
      onChange(value);
    }
  };
  const widthClass = `max-w-${width}`;

  return (
    <select
      className={`select select-bordered ${widthClass}`}
      value={multiple ? undefined : selectedValues[0]}
      multiple={multiple}
      onChange={handleChange}
      required={required}
    >
      <option value="" selected disabled={disabled}>
        {placeholder}
      </option>
      {options.map((option) => (
        <option
          key={option.id}
          value={option.name}
          selected={
            multiple
              ? selectedValues.includes(option.name)
              : selectedValues[0] === option.name
          }
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
