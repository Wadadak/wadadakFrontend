import React from 'react';
import Label from './Label';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string; // input 타입
  placeholder?: string;
  required?: boolean;
  maxLength?: number; // 글자 수 제한
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 너비를 위한 프롭
  as?: 'input' | 'textarea'; //input 또는 textarea 선택 (기본은 input)
  rows?: number; // textarea의 경우
}

const TextInput = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  maxLength,
  width = 'xs',
  as = 'input',
  rows = 5,
}: TextInputProps) => {
  const widthClass = `max-w-${width}`;

  return (
    <label className={`form-control w-full py-2 `}>
      <Label label={label} required={required} />
      {as === 'textarea' ? (
        <textarea
          className="textarea textarea-bordered w-1/2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          rows={rows}
        />
      ) : (
        <input
          className={`input input-bordered w-full ${widthClass}`}
          type={type}
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
