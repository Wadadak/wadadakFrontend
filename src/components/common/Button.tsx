import React from 'react';

interface ButtonProps {
  outline?: boolean; // 아웃라인 버튼으로 변경
  color?: 'primary' | 'secondary' | 'accent' | string;
  textColor?: 'white' | 'black' | string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({
  outline = false,
  color = 'primary',
  textColor = 'white',
  size = 'md',
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  const outlineClass = outline ? `btn-outline` : '';
  const colorClass = `btn-${color}`;
  const textColorClass = `text-${textColor}`;
  const sizeClass = `btn-${size}`;

  return (
    <button
      className={`btn ${outlineClass} ${colorClass} ${sizeClass} ${textColorClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
