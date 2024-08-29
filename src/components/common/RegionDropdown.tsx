import React from 'react';
import { useRegions } from '@/hooks/useRegions';
import Dropdown from './Dropdown';
import LoadingSpinner from './LoadingSpinner';
import ErrorComponent from './ErrorComponent';

interface RegionDropdownProps {
  selectedRegion?: string | number | null;
  onRegionChange: (region: string | number) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean; // 첫 번째 옵션(placeholder) disabled 여부
  errorMessage?: string;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 너비를 위한 프롭
}

const RegionDropdown = ({
  selectedRegion,
  onRegionChange,
  placeholder = '지역을 선택하세요.',
  required = false,
  width = 'xs',
  disabled = true,
  errorMessage,
}: RegionDropdownProps) => {
  const { data: regions, isLoading, error } = useRegions();

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <ErrorComponent message="지역 정보를 불러오지 못했습니다." />;

  // 드롭다운 값 변경 핸들러
  const handleRegionChange = (value: string | number) => {
    onRegionChange(value); // 상위 컴포넌트에 선택된 값 전달
  };

  return (
    <Dropdown
      options={regions}
      onChange={handleRegionChange}
      selectedValue={selectedRegion}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      errorMessage={errorMessage}
      width={width}
    />
  );
};

export default RegionDropdown;
