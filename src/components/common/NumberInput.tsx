import React from 'react';

interface NumberInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  required?: boolean;
  min?: number; // 최소값 제한
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 너비를 위한 프롭
  error?: string;
}

const NumberInput = ({
  value,
  onChange,
  placeholder = '',
  required = false,
  min = 1,
  width = 'xs',
  error,
}: NumberInputProps) => {
  const widthClass = `max-w-${width}`;

  // 숫자 입력 제어
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파싱 작업
    const inputValue = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기

    // 입력값 비어질 때 상태 업데이트
    if (inputValue === '') {
      onChange(null);
      return;
    }

    const numericValue = parseInt(inputValue, 10);

    // 최소값
    if (!isNaN(numericValue) && numericValue >= min) {
      onChange(numericValue);
    } else if (numericValue < min) {
      onChange(min);
    }
  };

  return (
    <>
      <input
        className={`input input-bordered w-full ${widthClass} ${error && 'input-error'}}`}
        type="text"
        value={value !== null ? value : ''}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default NumberInput;
