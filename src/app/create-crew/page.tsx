'use client';

import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import TextInput from '@/components/common/TextInput';
import NumberInput from '@/components/common/NumberInput';
import Dropdown from '@/components/common/Dropdown';
import Label from '@/components/common/Label';
import Button from '@/components/common/Button';

const CreateCrewPage = () => {
  const handleChange = (value: string | number) => {
    console.log(value);
  };

  return (
    <>
      <TitleBanner>크루 만들기</TitleBanner>
      <Wrapper>
        <Label label="크루명" required={true}>
          <TextInput
            value=""
            onChange={handleChange}
            placeholder="name"
            required={true}
            maxLength={30}
          />
        </Label>
        <Label label="크루 소개" required={true}>
          <TextInput
            value=""
            onChange={handleChange}
            placeholder="description"
            required={true}
            maxLength={500}
            as="textarea"
          />
        </Label>
        <Label label="크루 정원">
          <NumberInput
            value={100}
            onChange={handleChange}
            placeholder="capacity"
          />
        </Label>
        <Label label="크루명을 조회한다면?">
          <p>와다닥</p>
        </Label>
        <Button outline={true}>하이</Button>
      </Wrapper>
    </>
  );
};

export default CreateCrewPage;
