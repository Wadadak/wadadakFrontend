'use client';

import Label from '@/components/common/Label';
import TextInput from '@/components/common/TextInput';
import { TitleBanner } from '@/components/layout/TitleBanner';
import { mockMyInfo } from '@/mocks/mockData/mockMyInfo';
import { loginState } from '@/recoil/atoms/userState';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const LoginPage = () => {
  const [isLogin, setLogin] = useRecoilState(loginState);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = () => {
    // 이메일과 비밀번호를 검사
    if (email === '') {
      alert('이메일을 입력해 주세요!');
      return;
    }

    if (password === '') {
      alert('비밀번호를입력해 주세요!');
      return;
    }

    if (email === mockMyInfo.email && password === mockMyInfo.password) {
      //hctodo 임시처리
      alert('로그인 성공');
      setLogin(true);
      router.push('/');
    } else {
      if (email !== mockMyInfo.email) {
        alert('존재하지 않는 이메일입니다.');
        return;
      }

      if (password !== mockMyInfo.password) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
    }
  };

  return (
    <div className="flex flex-col bg-base-200">
      <TitleBanner>와다닥에 오신것을 환영합니다!</TitleBanner>
      <div className="flex justify-center py-16">
        <div className="card w-[450px] bg-base-100 shadow-2xl">
          <div className="space-y-3 card-body">
            {/* hctodo: 나중에 지울 텍스트 */}
            <div className="text-xs">
              임시로 wadadak@gmail.com/1234로 로그인 가능합니다
            </div>
            {/* email */}
            <Label label="이메일" textSize="sm">
              <TextInput
                value={email}
                placeholder="이메일 입력"
                onChange={setEmail}
                width="full"
              />
            </Label>
            {/* password */}
            <Label label="비밀번호" textSize="sm">
              <TextInput
                value={password}
                placeholder="비밀번호 입력"
                onChange={setPassword}
                width="full"
              />
            </Label>
            {/* login */}
            <div className="mt-6 form-control">
              <button className="btn btn-primary" onClick={handleLogin}>
                로그인
              </button>
            </div>
            <div className="divider">OR</div>
            <div className="form-control">
              <button className="btn btn-outline btn-accent">
                구글로 로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
