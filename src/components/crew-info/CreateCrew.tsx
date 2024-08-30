'use client';

import React from 'react';
import TextInput from '@/components/common/TextInput';
import NumberInput from '@/components/common/NumberInput';
import Label from '@/components/common/Label';
import CheckBox from '@/components/common/CheckBox';
import Button from '@/components/common/Button';
import MinMaxYearSelector from '@/components/crew/MinMaxYearSelector';
import ImageUpload from '../common/ImageUpload';
import RegionDropdown from '../common/RegionDropdown';
import { useCrewForm } from '@/hooks/useCrewForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';

const CreateCrew = () => {
  const {
    crewName,
    setCrewName,
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
    handleImageUpload,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    gender,
    setGender,
    handleSubmit,
    errors,
    isRoleLoading,
    isInfoLoading,
    isRoleError,
    isInfoError,
    roleError,
    infoError,
  } = useCrewForm();

  if (isRoleLoading || isInfoLoading) {
    return <LoadingSpinner />;
  }

  if (isRoleError) {
    return (
      <ErrorComponent
        message={roleError?.message || '권한을 확인하지 못했습니다.'}
      />
    );
  }

  if (isInfoError) {
    return (
      <ErrorComponent
        message={infoError?.message || '크루 정보를 불러오는 데 실패했습니다.'}
      />
    );
  }

  return (
    <>
      <div className="pb-5">
        <Label label="크루명" required>
          <TextInput
            value={crewName}
            onChange={setCrewName}
            placeholder="크루명을 입력하세요"
            required
            maxLength={30}
            error={errors.name}
          />
        </Label>
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
            errorMessage={errors.location}
          />
        </Label>
        <Label label="가입 신청자의 러닝 프로필 공개 여부" required>
          <CheckBox
            options={[
              { id: 'true', name: '필수' },
              { id: 'false', name: '선택' },
            ]}
            selectedValues={runRecordOpen ? ['true'] : ['false']}
            onChange={(values) => setRunRecordOpen(values.includes('true'))}
          />
        </Label>
        // FIXME
        {/* <Label label="가입 승인 여부" required>
          <CheckBox
            options={[
              { id: 'true', name: '승인 필요' },
              { id: 'false', name: '자동 가입' },
            ]}
            selectedValues={leaderRequired ? ['true'] : ['false']}
            onChange={(values) => setLeaderRequired(values.includes('true'))}
          />
        </Label> */}
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
              { id: 'male', name: '남성' },
              { id: 'female', name: '여성' },
            ]}
            selectedValues={[gender || '']}
            onChange={(values) => setGender(values[0])}
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
          <ImageUpload onImageChange={handleImageUpload} />
        </Label>
      </div>
      <div className="flex w-full justify-end">
        <Button
          wide={true}
          color="secondary"
          onClick={handleSubmit}
          type="submit"
        >
          제출하기
        </Button>
      </div>
    </>
  );
};

export default CreateCrew;
