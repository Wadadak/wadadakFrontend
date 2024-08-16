import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activityRegionsState } from '@/recoil/atoms/activityRegionsState';
import { crewLocationState } from '@/recoil/atoms/crewState';
import Dropdown from '../common/Dropdown';

const RegionSelector = () => {
  const regions = useRecoilValue(activityRegionsState);
  const [selectedRegion, setSelectedRegion] = useRecoilState(crewLocationState);

  return (
    <Dropdown
      options={regions}
      onChange={(value) => setSelectedRegion(value as string)} // 선택된 값을 상태에 저장
      placeholder="활동 지역을 선택하세요"
      required={true}
      selectedValues={[selectedRegion]} // 선택된 값 전달
    />
  );
};

export default RegionSelector;
