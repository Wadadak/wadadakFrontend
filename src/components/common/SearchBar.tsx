import React, { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onSearch: (value: string) => void;
}

const SearchBar = ({
  placeholder = '검색하기',
  size = 'sm',
  onSearch,
}: SearchBarProps) => {
  const sizeClass = `input-${size}`;

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // 상태를 업데이트하여 입력 필드에 반영
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <label
      className={`flex items-center gap-2 input input-bordered ${sizeClass}`}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="grow"
        placeholder={placeholder}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
        onClick={handleSearch}
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

export default SearchBar;
