import React, { FormEvent, MouseEvent } from 'react';

interface ButtonProps {
  outline?: boolean; // 아웃라인 버튼으로 변경
  color?: 'primary' | 'secondary' | 'accent' | string;
  textColor?: 'white' | 'black' | string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  wide?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button = ({
  outline = false,
  color = 'primary',
  textColor = 'white',
  size = 'md',
  wide = false,
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  const outlineClass = outline ? `btn-outline` : '';
  const colorClass = `btn-${color}`;
  const textColorClass = `text-${textColor}`;
  const sizeClass = `btn-${size}`;
  const wideClass = wide ? 'btn-wide' : '';

  return (
    <button
      className={`btn ${outlineClass} ${colorClass} ${sizeClass} ${textColorClass} ${wideClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
