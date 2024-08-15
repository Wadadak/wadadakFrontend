import React from 'react';
import { useRecoilState } from 'recoil';
import { dropdownState } from '@/recoil/atoms/dropdownState';
import Label from './Label';

interface DropdownProps {
  label: string;
  options: string[]; // 드롭다운에 표시할 옵션 배열
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  required?: boolean;
  multiple?: boolean; // 다중 선택 가능 여부
  selectedValues?: string[]; // 다중 선택일 경우 선택된 값들
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 너비를 위한 프롭
}

// 라벨 없는 드롭다운
const Dropdown = ({
  label,
  options,
  onChange,
  placeholder = '',
  required = false,
  multiple = false,
  selectedValues = [],
  width = 'xs',
}: DropdownProps) => {
  const [selected, setSelected] = useRecoilState(dropdownState);

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
    <label className={`form-control w-full py-2 ${widthClass} `}>
      <Label label={label} required={required} />
      <select
        className={`select select-bordered ${widthClass}`}
        value={multiple ? undefined : selectedValues[0]}
        multiple={multiple}
        onChange={handleChange}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            selected={
              multiple
                ? selectedValues.includes(option)
                : selectedValues[0] === option
            }
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
