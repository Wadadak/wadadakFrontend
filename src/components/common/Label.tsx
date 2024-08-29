import React from 'react';

// 정보 조회 (단순 텍스트와 함께), 정보 입력 할 때 활용 가능

interface LabelProps {
  label: string;
  required?: boolean;
  textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | string;
  children: React.ReactNode;
  htmlFor?: string;
}

const Label = ({
  label,
  required = false,
  textSize = 'lg',
  children,
  htmlFor,
}: LabelProps) => {
  const textSizeClass = `text-${textSize}`;

  return (
    <label className="w-full py-2 form-control" htmlFor={htmlFor}>
      <div className="label">
        <span className={`label-text ${textSizeClass}`}>
          {label}
          {/* 필수 표시 */}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </div>
      {children} {/* 입력 폼이나 텍스트 렌더링 */}
    </label>
  );
};

export default Label;
