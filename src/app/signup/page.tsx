'use client';

import Avatar from '@/components/common/Avatar';
import CheckBox from '@/components/common/CheckBox';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import ImageUpload from '@/components/common/ImageUpload';
import Label from '@/components/common/Label';
import TextInput from '@/components/common/TextInput';
import { ToggleButton } from '@/components/common/ToggleButtion';
import YearOfBirthDropdown from '@/components/common/YearOfBirthDropdown';
import { TitleBanner } from '@/components/layout/TitleBanner';
import { useLogin } from '@/hooks/user/useLogin';
import { useSignup } from '@/hooks/user/useSignup';
import { useRegions } from '@/hooks/useRegions';
import { loginState } from '@/recoil/atoms/userState';
import { genderType, SignupRequest } from '@/types/userTypes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const SignUpPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [nickName, setNickName] = useState<string>();
  const [profileImage, setProfileImage] = useState<File>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [gender, setGender] = useState<string[]>([]);
  const [birthYear, setBirthYear] = useState<number | undefined>();
  const [activityRegion, setActivityRegion] = useState<string>();

  const router = useRouter();
  const [isNameOn, setIsNameOn] = useState<boolean>(false);
  const [isPhoneNumberOn, setIsPhoneNumberOn] = useState<boolean>(false);
  const [isGenderOn, setIsGenderOn] = useState<boolean>(false);
  const [isAgeOn, setIsAgeOn] = useState<boolean>(false);

  const setLogin = useSetRecoilState(loginState);
  const regionList = useRegions().data;

  const validateEmail = (email?: string): boolean => {
    //기획: email 형식(xxx@xxx.xxx), 50자 이내
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password?: string): boolean => {
    //기획: 숫자, 대소문자, 특수문자 1개 이상, 8자~50자
    if (!password) return false;
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

    if (email && email?.length > 50) {
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

    const body: SignupRequest = {
      name,
      email,
      password,
      confirmPassword,
      nickName,
      phoneNumber,
      profileImage,
      gender: gender[0] as genderType,
      birthYear,
      activityRegion,
      nameVisibility: isNameOn ? 'PUBLIC' : 'PRIVATE',
      phoneNumberVisibility: isPhoneNumberOn ? 'PUBLIC' : 'PRIVATE',
      genderVisibility: isGenderOn ? 'PUBLIC' : 'PRIVATE',
      birthYearVisibility: isAgeOn ? 'PUBLIC' : 'PRIVATE',
    };

    signup(body);
  };

  const { mutate: login } = useLogin(
    () => {
      alert('회원가입이 완료되었습니다.');

      setLogin(true);
      router.push('/');
    },
    (message) => {
      alert(message);
    },
  );

  const { mutate: signup } = useSignup(
    () => {
      login({ email, password });
    },
    (message) => {
      alert(message);
    },
  );

  return (
    <div className="flex flex-col bg-base-200">
      <TitleBanner>와다닥에 오신것을 환영합니다!</TitleBanner>
      <div className="flex justify-center py-16">
        <div className="card w-[450px] bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="text-[20px] font-bold text-gray-700">회원가입</div>
            <div className="flex flex-col mt-5 space-y-4">
              {/* e-mail */}
              <Label label={'이메일'} textSize="sm" required>
                <TextInput
                  value={email}
                  onChange={(value) => {
                    setEmail(value);
                  }}
                  placeholder="이메일 입력"
                />
              </Label>
              {/* password */}
              <Label label={'비밀번호'} textSize="sm" required>
                <TextInput
                  value={password}
                  type="password"
                  onChange={setPassword}
                  placeholder="비밀번호 입력"
                />
              </Label>
              <Label label={'비밀번호 확인'} textSize="sm" required>
                <TextInput
                  value={confirmPassword}
                  type="password"
                  onChange={setConfirmPassword}
                  placeholder="비밀번호 확인 입력"
                />
              </Label>
              {/* name */}
              <Label label={'이름'} textSize="sm" required>
                <div className="flex flex-col space-y-3">
                  <TextInput
                    value={name}
                    onChange={setName}
                    placeholder="이름을 입력해 주세요"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="text-[12px] font-semibold">프로필 공개</div>
                    <ToggleButton
                      isOn={isNameOn}
                      onButtonClick={() => setIsNameOn(!isNameOn)}
                    />
                  </div>
                </div>
              </Label>
              {/* nickName */}
              <Label label={'닉네임'} textSize="sm" required>
                <TextInput
                  value={nickName}
                  onChange={setNickName}
                  placeholder="닉네임을 입력해 주세요"
                />
              </Label>
              {/* P.image */}
              <Label label={'프로필 이미지'} textSize="sm">
                <div className="flex items-center space-x-5">
                  <Avatar size="w-24" />
                  <ImageUpload onImageChange={setProfileImage} />
                </div>
              </Label>
              {/* phoneNumber */}
              <Label label={'휴대전화'} textSize="sm" required>
                <div className="flex flex-col space-y-3">
                  <TextInput
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    placeholder="번호를 입력해 주세요"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="text-[12px] font-semibold">프로필 공개</div>
                    <ToggleButton
                      isOn={isPhoneNumberOn}
                      onButtonClick={() => setIsPhoneNumberOn(!isPhoneNumberOn)}
                    />
                  </div>
                </div>
              </Label>
              {/* gender */}
              <Label label={'성별'} textSize="sm" required>
                <div className="flex flex-col space-y-5">
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
                      setGender(list as string[]);
                    }}
                  />
                  <div className="flex items-center space-x-2">
                    <div className="text-[12px] font-semibold">프로필 공개</div>
                    <ToggleButton
                      onButtonClick={() => setIsGenderOn(!isGenderOn)}
                      isOn={isGenderOn}
                    />
                  </div>
                </div>
              </Label>
              {/* age */}
              <Label label={'나이'} textSize="sm" required>
                <div className="flex flex-col space-y-3">
                  <YearOfBirthDropdown
                    placeholder="태어난 해를 선택해 주세요"
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
              </Label>
              {/* activity area */}
              <Label label={'활동지역'} textSize="sm">
                <Dropdown
                  placeholder="지역을 선택해 주세요"
                  options={regionList as DropdownOption[]}
                  onChange={(region) => {
                    setActivityRegion(region as string);
                  }}
                />
              </Label>
            </div>
            {/* sign up */}
            <div className="mt-8 form-control">
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
    <label className="flex items-center justify-start label" htmlFor={htmlFor}>
      <span className="label-text">{title}</span>
      {required && <div className="ml-1 text-red-500">*</div>}
    </label>
  );
};


// {
//   "id": 20,
//   "email": "aaa@gmail.com",
//   "emailVerified": false,
//   "phoneNumber": "01012341235",
//   "name": "정희철",
//   "nickName": "정희철테스트1",
//   "birthYear": 2014,
//   "gender": "MALE",
//   "roles": [
//       "ROLE_USER"
//   ],
//   "activityRegion": "NATIONWIDE",
//   "imageUrl": "https://running-service.s3.ap-northeast-2.amazonaws.com/user-default",
//   "nameVisibility": "PUBLIC",
//   "phoneNumberVisibility": "PUBLIC",
//   "genderVisibility": "PUBLIC",
//   "birthYearVisibility": "PUBLIC"
// }