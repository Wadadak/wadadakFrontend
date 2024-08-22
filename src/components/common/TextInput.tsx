import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  type?: string; // input 타입
  placeholder?: string;
  required?: boolean;
  maxLength?: number; // 글자 수 제한
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string; // 너비를 위한 프롭
  as?: 'input' | 'textarea'; //input 또는 textarea 선택 (기본은 input)
  rows?: number; // textarea의 경우
  error?: string; // 에러 메시지 프롭스
}

const TextInput = ({
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  maxLength,
  width,
  as = 'input',
  rows = 5,
  error,
}: TextInputProps) => {
  const inputWidthClass = width ? `max-w-${width}` : 'max-w-xs';
  const textareaWidthClass = width ? `w-${width}` : 'w-1/2';

  return (
    <>
      {as === 'textarea' ? (
        <textarea
          className={`textarea textarea-bordered ${textareaWidthClass} ${error && 'textarea-error'}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          rows={rows}
        />
      ) : (
        <input
          className={`input input-bordered w-full ${inputWidthClass} ${error && 'input-error'}`}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default TextInput;
