'use client';

import React, { useEffect } from 'react';
import TextInput from '@/components/common/TextInput';
import NumberInput from '@/components/common/NumberInput';
import Label from '@/components/common/Label';
import CheckBox from '@/components/common/CheckBox';
import Button from '@/components/common/Button';
import MinMaxYearSelector from '@/components/crew/MinMaxYearSelector';
import ImageUpload from '../common/ImageUpload';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';
import { useUpdateCrewForm } from '@/hooks/crew/useUpdateCrewForm';
import { getCrewIdFromParams } from '@/utils/getCrewIdFromParams';
import { useCrewInfo } from '@/hooks/crew/useCrewInfo';
import RegionDropdown from '../common/RegionDropdown';

const UpdateCrew = () => {
  // 크루 ID 가져오기
  const crewId = getCrewIdFromParams();

  if (crewId === null) {
    return <ErrorComponent message="유효하지 않은 크루 ID입니다." />;
  }
  const { data: crewInfo, isLoading: isCrewInfoLoading } = useCrewInfo(crewId);

  // 크루 업데이트 폼 훅
  const {
    crewName,
    description,
    setDescription,
    activityRegion,
    setActivityRegion,
    runRecordOpen,
    setRunRecordOpen,
    leaderRequired,
    setLeaderRequired,
    crewCapacity,
    setCrewCapacity,
    crewImage,
    setCrewImage,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    gender,
    setGender,
    handleSubmit,
    handleImageUpload,
    errors,
  } = useUpdateCrewForm(crewId, crewInfo);

  if (isCrewInfoLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="pb-5">
        <div className="text-4xl font-bold text-center mb-6">{crewName}</div>
        <Label label="크루 소개" required>
          <TextInput
            value={description}
            onChange={setDescription}
            placeholder="크루를 소개해주세요"
            required
            maxLength={500}
            as="textarea"
            error={errors.description}
          />
        </Label>
        <Label label="활동 지역" required>
          <RegionDropdown
            selectedRegion={activityRegion}
            required
            onRegionChange={(value) => setActivityRegion(value as string)}
          />
        </Label>
        <Label label="가입 신청자의 러닝 프로필 공개 여부" required>
          <CheckBox
            options={[
              { id: 'true', name: '필수' },
              { id: 'false', name: '선택' },
            ]}
            selectedValues={runRecordOpen ? ['true'] : ['false']}
            onChange={(values) => setRunRecordOpen(values!.includes('true'))}
          />
        </Label>
        <Label label="가입 승인 여부" required>
          <CheckBox
            options={[
              { id: 'true', name: '승인 필요' },
              { id: 'false', name: '자동 가입' },
            ]}
            selectedValues={leaderRequired ? ['true'] : ['false']}
            onChange={(values) => setLeaderRequired(values!.includes('true'))}
          />
        </Label>
        <Label label="크루 정원">
          <NumberInput
            value={crewCapacity}
            onChange={setCrewCapacity}
            placeholder="capacity"
          />
        </Label>
        <Label label="성별 제한">
          <CheckBox
            options={[
              { id: 'MALE', name: '남성' },
              { id: 'FEMALE', name: '여성' },
            ]}
            selectedValues={gender ? [gender] : undefined}
            onChange={(values) => {
              if (values && values.length > 0) {
                const selectedGender = values[0] as 'MALE' | 'FEMALE';
                setGender(selectedGender);
              } else {
                setGender(undefined);
              }
            }}
          />
        </Label>
        <Label label="연령대 제한">
          <MinMaxYearSelector
            maxAge={maxYear}
            minAge={minYear}
            onMaxAgeChange={(age) => setMaxYear(age)}
            onMinAgeChange={(age) => setMinYear(age)}
          />
        </Label>
        <Label label="대표 이미지">
          <ImageUpload
            onImageChange={handleImageUpload}
            imgUrl={typeof crewImage === 'string' ? crewImage : undefined}
          />
        </Label>
      </div>
      <div className="flex w-full justify-end">
        <Button wide={true} color="accent" onClick={handleSubmit} type="submit">
          제출하기
        </Button>
      </div>
    </>
  );
};

export default UpdateCrew;
