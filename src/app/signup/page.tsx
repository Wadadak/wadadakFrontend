'use client';

import { TitleBanner } from '@/components/TitleBanner';
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

  const router = useRouter();
  const [isOn, setIsOn] = useState<boolean>(false);
  const [isOn2, setIsOn2] = useState<boolean>(false);
  const [isOn3, setIsOn3] = useState<boolean>(false);

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
                  <button
                    onClick={() => setIsOn(!isOn)}
                    className={`flex items-center w-11 h-6 p-1 rounded-full transition-colors ${
                      isOn ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${
                        isOn ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
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
                  <div className="bg-gray-200 rounded-full w-20 h-20"></div>
                  <div className="flex items-center space-x-2">
                    <div className="text-[12px] font-semibold">프로필 공개</div>
                    <button
                      onClick={() => setIsOn2(!isOn2)}
                      className={`flex items-center w-11 h-6 p-1 rounded-full transition-colors ${
                        isOn2 ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${
                          isOn2 ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <button
                  className="border-2 border-gray-600 p-2 rounded-lg text-[15px] font-semibold hover:bg-gray-100"
                  onClick={() => {}}
                >
                  이미지 업로드
                </button>
              </div>
              {/* phoneNumber */}
              <div className="flex flex-col space-y-4">
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
                  <button
                    onClick={() => setIsOn3(!isOn3)}
                    className={`flex items-center w-11 h-6 p-1 rounded-full transition-colors ${
                      isOn3 ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${
                        isOn3 ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
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
  required: boolean; //필수값인지 여부
}
const Title = ({ title, htmlFor, required }: TitleProps) => {
  return (
    <label className="label flex items-center justify-start" htmlFor={htmlFor}>
      <span className="label-text">{title}</span>
      {required && <div className="text-red-500 ml-1">*</div>}
    </label>
  );
};
