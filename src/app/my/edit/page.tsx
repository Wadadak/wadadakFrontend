'use client';

import Avatar from '@/components/common/Avatar';
import CheckBox from '@/components/common/CheckBox';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import NumberInput from '@/components/common/NumberInput';
import TextInput from '@/components/common/TextInput';
import { ToggleButton } from '@/components/common/ToggleButtion';
import YearOfBirthDropdown from '@/components/common/YearOfBirthDropdown';
import { TitleBanner } from '@/components/layout/TitleBanner';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const regionList: DropdownOption[] = [
  { id: '0', name: '전국' },
  { id: '1', name: '서울특별시' },
  { id: '2', name: '부산광역시' },
  { id: '3', name: '대구광역시' },
  { id: '4', name: '인천광역시' },
  { id: '5', name: '광주광역시' },
  { id: '6', name: '대전광역시' },
  { id: '7', name: '울산광역시' },
  { id: '8', name: '세종특별자치시' },
  { id: '9', name: '경기도' },
  { id: '10', name: '강원도' },
  { id: '11', name: '충청북도' },
  { id: '12', name: '충청남도' },
  { id: '13', name: '전라북도' },
  { id: '14', name: '전라남도' },
  { id: '15', name: '경상북도' },
  { id: '16', name: '경상남도' },
  { id: '17', name: '제주특별자치도' },
];

const EditPage = () => {
  const router = useRouter();
  const [nickName, setNickName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
  const [gender, setGender] = useState<string[]>([]);
  const [age, setAge] = useState<number | null>(null);
  const [activityArea, setActivityArea] = useState<string[]>([]);

  const [isImageOn, setIsImageOn] = useState<boolean>(false);
  const [isPhoneNumberOn, setIsPhoneNumberOn] = useState<boolean>(false);
  const [isGenderOn, setIsGenderOn] = useState<boolean>(false);
  const [isAgeOn, setIsAgeOn] = useState<boolean>(false);

  useEffect(() => {
    //임시 목업 데이터
    const result = {
      nickname: '날아라 호빵맨',
      age: 1988,
    };

    setNickName(result.nickname);
    setPhoneNumber(123456879);
    setGender(['M']);
    setAge(result.age);
    setActivityArea(['1']);
    setIsAgeOn(false);
    setIsGenderOn(true);
    setIsImageOn(true);
  }, []);

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
            <div className="flex flex-col space-y-4 mt-5">
              {/* nickName */}
              <div className="form-control">
                <Title title={'닉네임'} htmlFor={'nickName'} required={true} />
                <TextInput
                  value={nickName}
                  onChange={(value) => {
                    setNickName(value);
                  }}
                  placeholder="닉네임을 입력해 주세요."
                  width="xl"
                />
              </div>
              {/* P.image */}
              <div className="flex items-center space-x-5">
                <div className="flex flex-col space-y-2 items-center">
                  <Title
                    title={'프로필 이미지'}
                    htmlFor={'profileImage'}
                    required={true}
                  />
                  <Avatar size="w-24" />
                  <div className="flex items-center space-x-2">
                    <div className="text-[12px] font-semibold">프로필 공개</div>
                    <ToggleButton
                      onButtonClick={() => setIsImageOn(!isImageOn)}
                      isOn={isImageOn}
                    />
                  </div>
                </div>
                <button className="btn btn-outline btn-secondary btn-sm">
                  이미지 업로드
                </button>
              </div>
              {/* phoneNumber */}
              <div className="flex flex-col space-y-3">
                <div className="form-control">
                  <Title
                    title={'휴대전화'}
                    htmlFor={'phoneNumber'}
                    required={true}
                  />
                  <NumberInput
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value);
                    }}
                    placeholder="휴대전화 번호를 입력해 주세요."
                    width="xl"
                  />
                </div>
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
                  <Title title={'성별'} htmlFor={''} required={true} />
                  <div className="flex space-x-10 pl-1">
                    <CheckBox
                      multiple={false}
                      options={[
                        {
                          id: 'M',
                          name: '남자',
                        },
                        {
                          id: 'F',
                          name: '여자',
                        },
                      ]}
                      selectedValues={gender}
                      onChange={(list) => {
                        console.log(list);
                        setGender(list);
                      }}
                    />
                  </div>
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
                <Title title={'나이'} htmlFor={''} required={true} />
                <YearOfBirthDropdown
                  selectedYear={age}
                  onYearChange={(age) => {
                    setAge(age);
                  }}
                />
                <div className="flex items-center space-x-2">
                  <div className="text-[12px] font-semibold">프로필 공개</div>
                  <ToggleButton
                    onButtonClick={() => setIsAgeOn(!isAgeOn)}
                    isOn={isAgeOn}
                  />
                </div>
              </div>
              {/* activity area */}
              <div>
                <Title title={'활동지역'} htmlFor={''} required={true} />
                <Dropdown
                  multiple={false}
                  options={regionList}
                  selectedValues={activityArea}
                  onChange={(activityArea) => {
                    setActivityArea(activityArea as string[]);
                  }}
                  width="xl"
                />
              </div>
            </div>
            {/* sign up */}
            <div className="form-control mt-8">
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
    <label className="label flex items-center justify-start" htmlFor={htmlFor}>
      <span className="label-text">{title}</span>
      {required && <div className="text-red-500 ml-1">*</div>}
    </label>
  );
};
