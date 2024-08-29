import React from 'react';

interface ErrorComponentProps {
  message?: string;
}

const ErrorComponent = ({
  message = '에러가 발생했습니다.',
}: ErrorComponentProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full text-center">
      <div className="text-red-600 font-bold mb-2">{message}</div>
    </div>
  );
};

export default ErrorComponent;
