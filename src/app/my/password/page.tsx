'use client';

import { getAccessToken } from '@/apis/authService';
import { extractUserIdFromToken } from '@/app/login/page';
import Avatar from '@/components/common/Avatar';
import CheckBox from '@/components/common/CheckBox';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import ImageUpload from '@/components/common/ImageUpload';
import Label from '@/components/common/Label';
import TextInput from '@/components/common/TextInput';
import { ToggleButton } from '@/components/common/ToggleButtion';
import YearOfBirthDropdown from '@/components/common/YearOfBirthDropdown';
import { TitleBanner } from '@/components/layout/TitleBanner';
import { useChangePassword } from '@/hooks/user/useChangePassword';
import { useEditProfile } from '@/hooks/user/useEditUserProfile';
import { useLoginUser } from '@/hooks/user/useLoginUser';
import { useUserProfile } from '@/hooks/user/useUserProfile';
import { useRegions } from '@/hooks/useRegions';
import { mockActivityRegions } from '@/mocks/mockData/mockActivityRegions';
import { mockMyInfo } from '@/mocks/mockData/mockMyInfo';
import {
  ChangePasswordRequest,
  EditProfileRequest,
  genderType,
} from '@/types/userTypes';
import { genderList, validatePassword } from '@/utilities';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EditPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>();
  const [cPassword, setCPassword] = useState<string>();
  const [rPassword, setRPassword] = useState<string>();

  const { mutate: changePassword } = useChangePassword(() => {
    alert('변경이 완료되었습니다!');
    router.back();
  }, alert);

  const handleChange = () => {
    if (!password || !cPassword || !rPassword) {
      alert('비밀번호를 입력해 주세요');
      return;
    }

    if (!validatePassword(cPassword)) {
      alert(
        '비밀번호는 숫자, 대소문자, 특수문자 1개 이상, 8자~50자여야 합니다.',
      );
      return;
    }

    if (cPassword !== rPassword) {
      alert('변경하려는 비밀번호와 비밀번호확인 내용이 다릅니다.');
      return;
    }

    const body: ChangePasswordRequest = {
      oldPassword: password,
      newPassword: cPassword,
      confirmNewPassword: rPassword,
    };

    changePassword(body);
  };

  return (
    <div className="flex flex-col bg-base-200">
      <TitleBanner>비밀번호 변경</TitleBanner>
      <div className="flex justify-center py-16">
        <div className="card w-[450px] bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="flex flex-col mt-5 space-y-4">
              <Label label={'현재 비밀번호'} textSize="sm" required>
                <TextInput
                  value={password}
                  type="password"
                  onChange={setPassword}
                  placeholder="비밀번호 입력"
                  width="xl"
                />
              </Label>
              <Label label={'변경할 비밀번호'} textSize="sm" required>
                <TextInput
                  value={cPassword}
                  // type="password"
                  onChange={setCPassword}
                  placeholder="비밀번호 입력"
                  width="xl"
                />
              </Label>
              <Label label={'변경할 비밀번호 확인'} textSize="sm" required>
                <TextInput
                  value={rPassword}
                  // type="password"
                  onChange={setRPassword}
                  placeholder="비밀번호 확인 입력"
                  width="xl"
                />
              </Label>
            </div>
            <div className="mt-8 form-control">
              <button className="btn btn-primary" onClick={handleChange}>
                변경하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
