'use client';

import React from 'react';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import TextInput from '@/components/common/TextInput';
import NumberInput from '@/components/common/NumberInput';
import Dropdown from '@/components/common/Dropdown';

const CreateCrewPage = () => {
  const handleChange = (value: string | number) => {
    console.log(value);
  };

  return (
    <>
      <TitleBanner>크루 만들기</TitleBanner>
      <Wrapper>
        <TextInput
          label="크루명"
          value=""
          onChange={handleChange}
          placeholder="name"
          required={true}
          maxLength={30}
        />
        <TextInput
          label="크루 소개"
          value=""
          onChange={handleChange}
          placeholder="description"
          required={true}
          maxLength={500}
          as="textarea"
        />
        <NumberInput
          label="크루 정원"
          value={100}
          onChange={handleChange}
          placeholder="capacity"
        />
      </Wrapper>
    </>
  );
};

export default CreateCrewPage;
