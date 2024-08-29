import React from 'react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'xm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
}: LoadingSpinnerProps) => {
  const sizeClassName = `loading-${size}`;
  const colorClassName = `text-${color}`;
  return (
    <div className="flex justify-center items-center h-full w-full">
      <span
        className={`loading loading-spinner ${sizeClassName} ${colorClassName}`}
      ></span>
    </div>
  );
};

export default LoadingSpinner;
