import React from 'react';

export interface DropdownOption {
  id: string | number;
  name: string;
}

interface DropdownProps {
  options: DropdownOption[]; // 드롭다운에 표시할 옵션 배열
  onChange: (value?: string | number) => void;
  placeholder?: string;
  required?: boolean;
  selectedValue?: string | number; // 선택된 값들
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 너비를 위한 프롭
  disabled?: boolean; // 첫 번째 옵션(placeholder) disabled 여부
  errorMessage?: string;
}

const Dropdown = ({
  options,
  onChange,
  placeholder = '',
  required = false,
  selectedValue,
  width = 'xs',
  disabled = true,
  errorMessage,
}: DropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  const widthClass = `max-w-${width}`;

  return (
    <>
      <select
        className={`select select-bordered ${widthClass}  ${errorMessage && 'select-error'}`}
        value={selectedValue}
        onChange={handleChange}
        required={required}
      >
        <option value="" selected disabled={disabled}>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </>
  );
};

export default Dropdown;
