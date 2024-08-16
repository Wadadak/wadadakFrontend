import React from 'react';

interface ButtonProps {
  variant?: '' | 'btn-outline'; // 아웃라인 버튼으로 변경, ''는 배경 있는 버튼
  color?: 'btn-primary' | 'btn-secondary' | 'btn-ghost';
  textColor?: 'text-white' | 'text-black' | 'text-gray-500';
  size?: 'btn-lg' | 'btn-md' | 'btn-sm' | 'btn-xs';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({
  variant = '',
  color = 'btn-primary',
  textColor = 'text-white',
  size = 'btn-md',
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`btn hover:btn-accent hover:${textColor} ${variant} ${color} ${size} ${textColor}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
