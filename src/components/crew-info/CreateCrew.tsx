'use client';

import React from 'react';
import TextInput from '@/components/common/TextInput';
import NumberInput from '@/components/common/NumberInput';
import Dropdown from '@/components/common/Dropdown';
import Label from '@/components/common/Label';
import CheckBox from '@/components/common/CheckBox';
import Button from '@/components/common/Button';
import MinMaxYearSelector from '@/components/crew/MinMaxYearSelector';
import ImageUpload from '../common/ImageUpload';
import { useCrewForm } from '@/hooks/useCrewForm';
import { mockActivityRegions } from '@/mocks/mockData/mockActivityRegions';
import RegionDropdown from '../common/RegionDropdown';
// TODO : API 함수들 import

const CreateCrew = () => {
  const {
    name,
    setName,
    description,
    setDescription,
    location,
    setLocation,
    recordRequired,
    setRecordRequired,
    approvalRequired,
    setApprovalRequired,
    image,
    handleImageUpload,
    capacity,
    setCapacity,
    genderRestriction,
    setGenderRestriction,
    maxAge,
    setMaxAge,
    minAge,
    setMinAge,
    handleSubmit,
    errors,
  } = useCrewForm();

  return (
    <>
      <div className="pb-5">
        <Label label="크루명" required>
          <TextInput
            value={name}
            onChange={setName}
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
          <RegionDropdown selectedRegion={location}>
          <Dropdown
            options={mockActivityRegions}
            onChange={(value) => setLocation(value as string)}
            placeholder="활동 지역을 선택하세요"
            required
            selectedValues={[location]}
            error={errors.location}
          />
        </Label>
        <Label label="가입 신청자의 러닝 프로필 공개 여부" required>
          <CheckBox
            options={[
              { id: 'true', name: '필수' },
              { id: 'false', name: '선택' },
            ]}
            selectedValues={recordRequired ? ['true'] : ['false']}
            onChange={(values) => setRecordRequired(values.includes('true'))}
          />
        </Label>
        <Label label="가입 승인 여부" required>
          <CheckBox
            options={[
              { id: 'true', name: '승인 필요' },
              { id: 'false', name: '자동 가입' },
            ]}
            selectedValues={approvalRequired ? ['true'] : ['false']}
            onChange={(values) => setApprovalRequired(values.includes('true'))}
          />
        </Label>
        <Label label="크루 정원">
          <NumberInput
            value={capacity}
            onChange={setCapacity}
            placeholder="capacity"
          />
        </Label>
        <Label label="성별 제한">
          <CheckBox
            options={[
              { id: 'male', name: '남성' },
              { id: 'female', name: '여성' },
            ]}
            selectedValues={[genderRestriction]}
            onChange={(values) => setGenderRestriction(values[0])}
          />
        </Label>
        <Label label="연령대 제한">
          <MinMaxYearSelector
            maxAge={maxAge}
            minAge={minAge}
            onMaxAgeChange={(age) => setMaxAge(age)}
            onMinAgeChange={(age) => setMinAge(age)}
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
