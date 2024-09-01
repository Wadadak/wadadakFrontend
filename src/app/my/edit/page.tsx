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
import { useEditProfile } from '@/hooks/user/useEditUserProfile';
import { useLoginUser } from '@/hooks/user/useLoginUser';
import { useUserProfile } from '@/hooks/user/useUserProfile';
import { useRegions } from '@/hooks/useRegions';
import { mockActivityRegions } from '@/mocks/mockData/mockActivityRegions';
import { mockMyInfo } from '@/mocks/mockData/mockMyInfo';
import { EditProfileRequest } from '@/types/userTypes';
import { genderList } from '@/utilities';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EditPage = () => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [nickName, setNickName] = useState<string>();
  const [profileImage, setProfileImage] = useState<File | string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [gender, setGender] = useState<string[]>([]);
  const [age, setAge] = useState<number>();
  const [activityArea, setActivityArea] = useState<string>();

  const [isNameOn, setIsNameOn] = useState<boolean>(false);
  const [isPhoneNumberOn, setIsPhoneNumberOn] = useState<boolean>(false);
  const [isGenderOn, setIsGenderOn] = useState<boolean>(false);
  const [isAgeOn, setIsAgeOn] = useState<boolean>(false);

  const { loginUser } = useLoginUser();
  const { data: regionList } = useRegions();
  const { data } = useUserProfile(
    extractUserIdFromToken(getAccessToken()) ?? 0,
    true,
  );
  const { mutate: editProfile } = useEditProfile(() => {
    alert('수정이 완료되었습니다!');
    router.back();
  }, alert);

  useEffect(() => {
    console.log('내 프로필 정보', data);
    setName(data?.name);
    setNickName(data?.nickName);
    setProfileImage(data?.profileImage as string);
    setPhoneNumber(data?.phoneNumber);
    setGender([data?.gender ?? '']);
    setAge(data?.birthYear);
    setActivityArea(data?.activityRegion);
    setIsNameOn(data?.nameVisibility === 'PUBLIC');
    setIsAgeOn(data?.birthYearVisibility === 'PUBLIC');
    setIsGenderOn(data?.genderVisibility === 'PUBLIC');
    setIsPhoneNumberOn(data?.phoneNumberVisibility === 'PUBLIC');
  }, [data]);

  const handleEdit = () => {
    const body: EditProfileRequest = {
      nickname: nickName,
      gender: gender[0] === 'MALE' ? 0 : 1,
      birthYear: age,
      activityRegion: activityArea,
      // profileImage,
      nameVisibility: isNameOn ? 'PUBLIC' : 'PRIVATE',
      phoneNumberVisibility: isPhoneNumberOn ? 'PUBLIC' : 'PRIVATE',
      genderVisibility: isGenderOn ? 'PUBLIC' : 'PRIVATE',
      birthYearVisibility: isAgeOn ? 'PUBLIC' : 'PRIVATE',
    };

    console.log('수정 요청', body);
    editProfile(body);
  };

  return (
    <div className="flex flex-col bg-base-200">
      <TitleBanner>프로필 수정</TitleBanner>
      <div className="flex justify-center py-16">
        <div className="card w-[450px] bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="flex flex-col mt-5 space-y-4">
              <Label label={'이름'} textSize="sm" required>
                <div className="flex flex-col items-center space-y-2">
                  <TextInput
                    disabled={true}
                    value={name}
                    onChange={setName}
                    placeholder="이름을 입력해 주세요."
                    width="xl"
                  />
                  <div className="flex w-full">
                    <div className="flex items-center space-x-2">
                      <div className="text-[12px] font-semibold">
                        프로필 공개
                      </div>
                      <ToggleButton
                        onButtonClick={() => setIsNameOn(!isNameOn)}
                        isOn={isNameOn}
                      />
                    </div>
                  </div>
                </div>
              </Label>
              {/* nickName */}
              <Label label={'닉네임'} textSize="sm" required>
                <TextInput
                  value={nickName}
                  onChange={setNickName}
                  placeholder="닉네임을 입력해 주세요."
                  width="xl"
                />
              </Label>
              {/* P.image */}
              <div className="flex items-center space-x-5">
                <div className="flex flex-col items-center space-y-2">
                  <Label label={'프로필 이미지'} textSize="sm" required>
                    <Avatar size="w-24" src={profileImage as string} />
                  </Label>
                  <ImageUpload
                    onImageChange={(file) => setProfileImage(file as File)}
                  />
                </div>
              </div>
              {/* phoneNumber */}
              <div className="flex flex-col space-y-3">
                <Label label={'휴대전화'} textSize="sm" required>
                  <TextInput
                    disabled={true}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    placeholder="휴대전화 번호를 입력해 주세요."
                    width="xl"
                  />
                </Label>
                <div className="flex items-center space-x-2">
                  <div className="text-[12px] font-semibold">프로필 공개</div>
                  <ToggleButton
                    onButtonClick={() => setIsPhoneNumberOn(!isPhoneNumberOn)}
                    isOn={isPhoneNumberOn}
                  />
                </div>
              </div>
              {/* gender */}
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col space-y-3">
                  <Label label={'성별'} textSize="sm" required>
                    <div className="flex pl-1 space-x-10">
                      <CheckBox
                        multiple={false}
                        options={genderList}
                        selectedValues={gender}
                        onChange={(list) => {
                          setGender(list as string[]);
                        }}
                      />
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-[12px] font-semibold">프로필 공개</div>
                  <ToggleButton
                    onButtonClick={() => setIsGenderOn(!isGenderOn)}
                    isOn={isGenderOn}
                  />
                </div>
              </div>
              {/* age */}
              <div className="flex flex-col space-y-3">
                <Label label={'나이'} textSize="sm" required>
                  <YearOfBirthDropdown
                    selectedYear={age}
                    onYearChange={setAge}
                  />
                </Label>
                <div className="flex items-center space-x-2">
                  <div className="text-[12px] font-semibold">프로필 공개</div>
                  <ToggleButton
                    onButtonClick={() => setIsAgeOn(!isAgeOn)}
                    isOn={isAgeOn}
                  />
                </div>
              </div>
              {/* activity area */}
              <Label label={'활동지역'} textSize="sm" required>
                <Dropdown
                  options={regionList as DropdownOption[]}
                  selectedValue={activityArea as string}
                  onChange={(activityArea) => {
                    setActivityArea(activityArea as string);
                  }}
                  width="xl"
                />
              </Label>
            </div>
            {/* sign up */}
            <div className="mt-8 form-control">
              <button className="btn btn-primary" onClick={handleEdit}>
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;

interface TitleProps {
  title: string;
  htmlFor: string;
  required: boolean;
}
const Title = ({ title, htmlFor, required }: TitleProps) => {
  return (
    <label className="flex items-center justify-start label" htmlFor={htmlFor}>
      <span className="label-text">{title}</span>
      {required && <div className="ml-1 text-red-500">*</div>}
    </label>
  );
};
