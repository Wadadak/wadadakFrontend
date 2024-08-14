import React from 'react';

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number; // 글자 수 제한
  labelClassName?: string; // <label> 요소의 추가 클래스
  inputClassName?: string; // <input> 요소의 추가 클래스
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 너비를 위한 프롭
  as?: 'input' | 'textarea'; //input 또는 textarea 선택 (기본은 input)
  rows?: number; // textarea의 경우
}

const Dropdown = ({
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  maxLength,
  labelClassName = '',
  inputClassName = '',
  width = 'xs',
}: SelectInputProps) => {
  const widthClass = `max-w-${width}`;

  return (
    <label className={`form-control w-full py-2 ${labelClassName}`}>
      <div className="label">
        <span className="label-text">
          {label}
          {/* 필수 표시 */}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </div>

      <select className="select select-bordered">
        <option disabled selected>
          {p}
        </option>
        <option>Star Wars</option>
        <option>Harry Potter</option>
        <option>Lord of the Rings</option>
        <option>Planet of the Apes</option>
        <option>Star Trek</option>
      </select>

      <input
        className={`input input-bordered w-full ${widthClass} ${inputClassName}`}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
      />
    </label>
  );
};

export default Dropdown;
