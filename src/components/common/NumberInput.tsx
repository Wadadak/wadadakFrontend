import React from 'react';
import Label from './Label';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  min?: number; // 최소값 제한
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 너비를 위한 프롭
}

const NumberInput = ({
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  min = 1,
  width = 'xs',
}: NumberInputProps) => {
  const widthClass = `max-w-${width}`;

  // 숫자 입력 제어
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파싱 작업
    const inputValue = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
    const numericValue = parseInt(inputValue, 10);

    // 최소값
    if (!isNaN(numericValue) && numericValue >= min) {
      onChange(numericValue);
    } else if (numericValue < min) {
      onChange(min);
    }
  };

  return (
    <label className={`form-control w-full py-2 `}>
      <Label label={label} required={required} />
      <input
        className={`input input-bordered w-full ${widthClass} }`}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
};

export default NumberInput;

// max-w-xs
