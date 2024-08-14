import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  min?: number; // 최소값 제한
  labelClassName?: string; // <label> 요소의 추가 클래스
  inputClassName?: string; // <input> 요소의 추가 클래스
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 너비를 위한 프롭
}

const NumberInput = ({
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  min = 1,
  labelClassName = '',
  inputClassName = '',
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
    <label className={`form-control w-full py-2 ${labelClassName}`}>
      <div className="label">
        <span className="label-text">
          {label}
          {/* 필수 표시 */}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </div>

      <input
        className={`input input-bordered w-full ${widthClass} ${inputClassName}`}
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
