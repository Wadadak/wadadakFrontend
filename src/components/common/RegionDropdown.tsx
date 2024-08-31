import React from 'react';
import { useRegions } from '@/hooks/useRegions';
import Dropdown from './Dropdown';
import LoadingSpinner from './LoadingSpinner';
import ErrorComponent from './ErrorComponent';

interface RegionDropdownProps {
  selectedRegion?: string | number;
  onRegionChange: (region?: string | number) => void;
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
  const { data: regions, isLoading, isError, error } = useRegions();

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <ErrorComponent
        message={error?.message || '지역 정보를 불러오지 못했습니다.'}
      />
    );

  return (
    <Dropdown
      options={regions || []}
      onChange={onRegionChange}
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
