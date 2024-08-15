'use client';

import Avatar from '@/components/common/Avatar';
import Dropdown from '@/components/common/Dropdown';
import { ToggleButton } from '@/components/common/ToggleButtion';
import { TitleBanner } from '@/components/layout/TitleBanner';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [gender, setGender] = useState<string>('');

  const router = useRouter();
  const [isNameOn, setIsNameOn] = useState<boolean>(false);
  const [isProfileOn, setIsProfileOn] = useState<boolean>(false);
  const [isPhoneNumberOn, setIsPhoneNumberOn] = useState<boolean>(false);
  const [isGenderOn, setIsGenderOn] = useState<boolean>(false);
  const [isAgeOn, setIsAgeOn] = useState<boolean>(false);

  const yearList = Array.from({ length: 2024 - 1924 + 1 }, (_, i) => 1924 + i);
  const regionList = [
    '전국',
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도',
  ];

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  const handleSignUp = () => {};

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
                <input
                  type="text"
                  id="email"
                  className="input input-bordered"
                  placeholder="이메일 입력"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  <input
                    type="text"
                    id="name"
                    className="input input-bordered"
                    placeholder="이름을 입력해 주세요."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                <input
                  type="text"
                  id="nickName"
                  className="input input-bordered"
                  placeholder="닉네임을 입력해 주세요."
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
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
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="input input-bordered"
                    placeholder="번호를 입력해 주세요."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    <div className="flex space-x-3">
                      <input
                        type="radio"
                        name="gender"
                        value={'M'}
                        className="cursor-pointer"
                        onChange={handleGenderChange}
                      />
                      <span>남</span>
                    </div>
                    <div className="flex space-x-3">
                      <input
                        type="radio"
                        name="gender"
                        value={'F'}
                        className="cursor-pointer"
                        onChange={handleGenderChange}
                      />
                      <span>여</span>
                    </div>
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
              <div className="flex flex-col space-y-1">
                <Title title={'나이'} htmlFor={''} required={true} />
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="btn m-1">
                    나이를 선택해 주세요.
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    {yearList.map((year) => {
                      return (
                        <li>
                          <a>{year}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
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
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="btn m-1">
                    활동지역을 선택해 주세요.
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    {regionList.map((region) => {
                      return (
                        <li>
                          <a>{region}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
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
