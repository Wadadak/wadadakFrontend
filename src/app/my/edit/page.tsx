'use client';

import Avatar from '@/components/common/Avatar';
import CheckBox from '@/components/common/CheckBox';
import Dropdown from '@/components/common/Dropdown';
import ImageUpload from '@/components/common/ImageUpload';
import Label from '@/components/common/Label';
import TextInput from '@/components/common/TextInput';
import { ToggleButton } from '@/components/common/ToggleButtion';
import YearOfBirthDropdown from '@/components/common/YearOfBirthDropdown';
import { TitleBanner } from '@/components/layout/TitleBanner';
import { mockActivityRegions } from '@/mocks/mockData/mockActivityRegions';
import { mockMyInfo } from '@/mocks/mockData/mockMyInfo';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EditPage = () => {
  const router = useRouter();
  const [nickName, setNickName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [gender, setGender] = useState<string[]>([]);
  const [age, setAge] = useState<number | null>(null);
  const [activityArea, setActivityArea] = useState<string>('');

  const [isImageOn, setIsImageOn] = useState<boolean>(false);
  const [isPhoneNumberOn, setIsPhoneNumberOn] = useState<boolean>(false);
  const [isGenderOn, setIsGenderOn] = useState<boolean>(false);
  const [isAgeOn, setIsAgeOn] = useState<boolean>(false);

  useEffect(() => {
    setNickName(mockMyInfo.nickname);
    setProfileImage(mockMyInfo.profileImage);
    setPhoneNumber(mockMyInfo.phoneNumber);
    setGender([mockMyInfo.gender]);
    setAge(mockMyInfo.birthYear);
    setActivityArea(mockMyInfo.activityRegion);
    setIsAgeOn(mockMyInfo.birthYearVisibility === 'PUBLIC');
    setIsGenderOn(mockMyInfo.genderVisibility === 'PUBLIC');
    setIsImageOn(mockMyInfo.profileImageVisibility === 'PUBLIC');
    setIsPhoneNumberOn(mockMyInfo.phoneNumberVisibility === 'PUBLIC');
  }, [mockMyInfo]);

  const handleEdit = () => {
    const body = {
      nickName,
      phoneNumber,
      gender,
      age,
      area: activityArea,
      isImageOn,
      isPhoneNumberOn,
      isGenderOn,
      isAgeOn,
    };
    console.log(body);
    alert('수정이 완료되었습니다!');
    router.back();
  };

  return (
    <div className="flex flex-col bg-base-200">
      <TitleBanner>프로필 수정</TitleBanner>
      <div className="flex justify-center py-16">
        <div className="card w-[450px] bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="flex flex-col mt-5 space-y-4">
              {/* nickName */}
              <Label label={'닉네임'} textSize="sm" required>
                <TextInput
                  value={nickName}
                  onChange={(value) => {
                    setNickName(value);
                  }}
                  placeholder="닉네임을 입력해 주세요."
                  width="xl"
                />
              </Label>
              {/* P.image */}
              <div className="flex items-center space-x-5">
                <div className="flex flex-col items-center space-y-2">
                  <Label label={'프로필 이미지'} textSize="sm" required>
                    <Avatar size="w-24" src={profileImage} />
                  </Label>
                  <ImageUpload
                    onImageChange={(file) => {
                      // hctodo
                      alert('프로필 이미지 변경은 아직 구현되지 않았습니다.');
                    }}
                  />
                  <div className="flex w-full">
                    <div className="flex items-center space-x-2">
                      <div className="text-[12px] font-semibold">
                        프로필 공개
                      </div>
                      <ToggleButton
                        onButtonClick={() => setIsImageOn(!isImageOn)}
                        isOn={isImageOn}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* phoneNumber */}
              <div className="flex flex-col space-y-3">
                <Label label={'휴대전화'} textSize="sm" required>
                  <TextInput
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value);
                    }}
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
                        options={[
                          {
                            id: 'MALE',
                            name: '남자',
                          },
                          {
                            id: 'FEMALE',
                            name: '여자',
                          },
                        ]}
                        selectedValues={gender}
                        onChange={(list) => {
                          setGender(list);
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
                    onYearChange={(age) => {
                      setAge(age);
                    }}
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
                  options={mockActivityRegions}
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
