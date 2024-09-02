import React from 'react';

interface TextInputProps {
  value?: string;
  onChange: (value?: string) => void;
  type?: string; // input 타입
  placeholder?: string;
  required?: boolean;
  maxLength?: number; // 글자 수 제한
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string; // 너비를 위한 프롭
  as?: 'input' | 'textarea'; //input 또는 textarea 선택 (기본은 input)
  rows?: number; // textarea의 경우
  error?: string; // 에러 메시지 프롭스

  disabled?: boolean; // 비활성화 여부
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
  disabled,
}: TextInputProps) => {
  const inputWidthClass = width ? `max-w-${width}` : 'max-w-xs';
  const textareaWidthClass = width ? `w-${width}` : 'w-1/2';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(e.target.value);
  };

  return (
    <>
      {as === 'textarea' ? (
        <textarea
          className={`textarea textarea-bordered ${textareaWidthClass} ${error && 'textarea-error'}`}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          rows={rows}
        />
      ) : (
        <input
          disabled={disabled}
          className={`input input-bordered w-full ${inputWidthClass} ${error && 'input-error'}`}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </>
  );
};

export default TextInput;
