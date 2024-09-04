import React, { FormEvent, MouseEvent } from 'react';

interface ButtonProps {
  outline?: boolean; // 아웃라인 버튼으로 변경
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'error'
    | 'warning'
    | 'base-500'
    | string;
  textColor?: 'white' | 'black' | string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  wide?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset'; // 기본은 button
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
  type = 'button',
  children,
}: ButtonProps) => {
  const outlineClass = outline ? `btn-outline` : '';
  const colorClass = `btn-${color}`;
  const textColorClass = `text-${textColor}`;
  const sizeClass = `btn-${size}`;
  const wideClass = wide ? 'btn-wide' : '';

  return (
    <button
      className={`btn ${outlineClass} ${sizeClass} ${textColorClass} ${wideClass}  ${colorClass}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
