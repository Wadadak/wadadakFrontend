'use client';

import Avatar from '@/components/common/Avatar';
import CheckBox from '@/components/common/CheckBox';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import TextInput from '@/components/common/TextInput';
import { ToggleButton } from '@/components/common/ToggleButtion';
import YearOfBirthDropdown from '@/components/common/YearOfBirthDropdown';
import { TitleBanner } from '@/components/layout/TitleBanner';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

//hctodo: API 호출하는 데이터로 바꿀 것
const regionList: DropdownOption[] = [
  { id: 'SEOUL', name: '서울특별시' },
  { id: 'BUSAN', name: '부산광역시' },
  { id: 'DAEGU', name: '대구광역시' },
  { id: 'INCHEON', name: '인천광역시' },
  { id: 'GWANGJU', name: '광주광역시' },
  { id: 'DAEJEON', name: '대전광역시' },
  { id: 'ULSAN', name: '울산광역시' },
  { id: 'SEJONG', name: '세종특별자치시' },
  { id: 'GYEONGGI', name: '경기도' },
  { id: 'GANGWON', name: '강원도' },
  { id: 'CHUNGBUK', name: '충청북도' },
  { id: 'CHUNGNAM', name: '충청남도' },
  { id: 'JEOLLABUK', name: '전라북도' },
  { id: 'JEOLLANAM', name: '전라남도' },
  { id: 'GYEONGBUK', name: '경상북도' },
  { id: 'GYEONGNAM', name: '경상남도' },
  { id: 'JEJU', name: '제주특별자치도' },
  { id: 'NATIONWIDE', name: '전국' },
];

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [gender, setGender] = useState<string[]>([]);
  const [birthYear, setBirthYear] = useState<number>(0);
  const [activityRegion, setActivityRegion] = useState<string>('');

  const router = useRouter();
  const [isNameOn, setIsNameOn] = useState<boolean>(false);
  const [isProfileOn, setIsProfileOn] = useState<boolean>(false);
  const [isPhoneNumberOn, setIsPhoneNumberOn] = useState<boolean>(false);
  const [isGenderOn, setIsGenderOn] = useState<boolean>(false);
  const [isAgeOn, setIsAgeOn] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    //기획: email 형식(xxx@xxx.xxx), 50자 이내
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    //기획: 숫자, 대소문자, 특수문자 1개 이상, 8자~50자
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,50}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = () => {
    //유효성검사
    if (!validateEmail(email)) {
      alert('유효하지 않은 이메일입니다.');
      return;
    }

    if (email.length > 50) {
      alert('이메일은 50자 이내여야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호를 확인해 주세요.');
      return;
    }

    if (!validatePassword(password)) {
      alert(
        '비밀번호는 숫자, 대소문자, 특수문자 1개 이상, 8자~50자여야 합니다.',
      );
      return;
    }

    const body = {
      username: name,
      email: email,
      password: password,
      checkPassword: confirmPassword,
      nickname: nickName,
      phoneNumber,
      profileImage,
      gender: gender[0],
      birthYear,
      activityRegion,

      // hctodo API 명세 추가되면 다시 수정할 것.
      isNameOn,
      isProfileOn,
      isPhoneNumberOn,
      isGenderOn,
      isAgeOn,
    };

    console.log('SignUpPage body', body);
    //api call
    // executeMutation(body);
  };

  return (
    <div className="flex flex-col bg-base-200">
      <TitleBanner>
        <div className="py-16">와다닥에 오신것을 환영합니다!</div>
      </TitleBanner>
      <div className="flex justify-center py-16">
        <div className="card w-[450px] bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="text-[20px] font-bold text-gray-700">회원가입</div>
            <div className="flex flex-col space-y-4 mt-5">
              {/* e-mail */}
              <div className="form-control">
                <Title title={'이메일'} htmlFor={'email'} required={true} />
                <TextInput
                  value={email}
                  onChange={(value) => {
                    setEmail(value);
                  }}
                  placeholder="이메일 입력"
                />
              </div>
              {/* password */}
              <div className="form-control">
                <Title
                  title={'비밀번호'}
                  htmlFor={'password'}
                  required={true}
                />
                <input
                  type="password"
                  id="password"
                  className="input input-bordered"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control">
                <Title
                  title={'비밀번호 확인'}
                  htmlFor={'confirmPassword'}
                  required={true}
                />
                <input
                  type="password"
                  id="confirmPassword"
                  className="input input-bordered"
                  placeholder="비밀번호 확인 입력"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {/* name */}
              <div className="flex flex-col space-y-3">
                <div className="form-control">
                  <Title title={'이름'} htmlFor={'name'} required={true} />
                  <TextInput
                    value={name}
                    onChange={(value) => {
                      setName(value);
                    }}
                    placeholder="이름을 입력해 주세요"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-[12px] font-semibold">프로필 공개</div>
                  <ToggleButton
                    onButtonClick={() => setIsNameOn(!isNameOn)}
                    isOn={isNameOn}
                  />
                </div>
              </div>
              {/* nickName */}
              <div className="form-control">
                <Title title={'닉네임'} htmlFor={'nickName'} required={true} />
                <TextInput
                  value={nickName}
                  onChange={(value) => {
                    setNickName(value);
                  }}
                  placeholder="닉네임을 입력해 주세요"
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
                      onButtonClick={() => setIsProfileOn(!isProfileOn)}
                      isOn={isProfileOn}
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
                  <TextInput
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value);
                    }}
                    placeholder="번호를 입력해 주세요"
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
                <div className="flex items-center space-x-2">
                  <div className="text-[12px] font-semibold">프로필 공개</div>
                  <ToggleButton
                    onButtonClick={() => setIsGenderOn(!isGenderOn)}
                    isOn={isGenderOn}
                  />
                </div>
              </div>
              {/* age */}
              <div className="flex flex-col space-y-1">
                <Title title={'나이'} htmlFor={''} required={true} />
                <YearOfBirthDropdown
                  selectedYear={birthYear}
                  onYearChange={setBirthYear}
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
                  options={regionList}
                  onChange={(region) => {
                    setActivityRegion(region as string);
                  }}
                />
              </div>
            </div>
            {/* sign up */}
            <div className="form-control mt-8">
              <button className="btn btn-primary" onClick={handleSignUp}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

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
