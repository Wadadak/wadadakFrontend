import React from 'react';

// 정보 조회 (단순 텍스트와 함께), 정보 입력 할 때 활용 가능

interface LabelProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const Label = ({ label, required = false, children }: LabelProps) => {
  return (
    <label className="form-control w-full py-2">
      <div className="label">
        <span className="label-text text-lg">
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
