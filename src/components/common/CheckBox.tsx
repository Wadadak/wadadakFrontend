import React from 'react';

interface CheckBoxProps {
  options: { id: string | number; name: string | number }[]; // 옵션 배열 프롭스
  selectedValues?: (string | number)[];
  onChange: (selectedValues?: (string | number)[]) => void;
  multiple?: boolean; // 다중 선택 가능 여부
  size?: 'xs' | 'sm' | 'md' | 'lg'; // 사이즈를 위한 프롭
  error?: string;
}

const CheckBox = ({
  options,
  selectedValues = [],
  onChange,
  multiple = false,
  error,
}: CheckBoxProps) => {
  const handleCheckBoxChange = (id: string | number, checked: boolean) => {
    let newSelectedValues: (string | number)[];

    if (multiple) {
      newSelectedValues = checked
        ? [...selectedValues, id]
        : selectedValues.filter((value) => value !== id);
    } else {
      newSelectedValues = checked ? [id] : [];
    }

    // 선택된 값이 없다면 undefined를 반환
    onChange(newSelectedValues.length > 0 ? newSelectedValues : undefined);
  };

  return (
    <>
      <div className="form-control flex flex-row space-x-4">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-xs"
              checked={selectedValues.includes(option.id)}
              onChange={(e) =>
                handleCheckBoxChange(option.id, e.target.checked)
              }
            />
            <span className="label-text">{option.name}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default CheckBox;
