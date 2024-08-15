import React from 'react';

// 정보 조회 (단순 텍스트와 함께), 정보 입력 할 때 활용 가능

interface LabelProps {
  label: string;
  required?: boolean;
}

const Label = ({ label, required = false }: LabelProps) => {
  return (
    <div className="label">
      <span className="label-text">
        {label}
        {/* 필수 표시 */}
        {required && <span className="text-red-500"> *</span>}
      </span>
    </div>
  );
};

export default Label;
