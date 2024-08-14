import React from 'react';
import { on } from 'stream';

interface TextInputProps {
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

const TextInput = ({
  labelClassName = '',
  inputClassName = '',
  width = 'xs',
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  maxLength,
  as = 'input',
  rows = 5,
}: TextInputProps) => {
  const widthClass = `max-w-${width}`;

  return (
    <label
      className={`form-control w-full py-2 ${widthClass} ${labelClassName}`}
    >
      <div className="label">
        <span className="label-text">
          {label}
          {/* 필수 표시 */}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </div>
      {as === 'textarea' ? (
        <textarea
          className="textarea textarea-bordered"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          rows={rows}
        />
      ) : (
        <input
          className={`input input-bordered w-full ${widthClass} ${inputClassName}`}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
        />
      )}
    </label>
  );
};

export default TextInput;
