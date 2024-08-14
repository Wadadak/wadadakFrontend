'use client';

import { TitleBanner } from '@/components/layout/TitleBanner';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = () => {
    // 이메일과 비밀번호를 검사
    if (username === '') {
      alert('이메일을 입력해 주세요!');
      return;
    }

    if (password === '') {
      alert('비밀번호를입력해 주세요!');
      return;
    }

    //임시로 메인페이지로 보낸다
    router.push('/');

    // 로그인 api에 이메일과 비밀번호를 보냄
    // isSuccess === true ? 메인 페이지로 이동 : 응 없는 회원입니다.
  };

  return (
    <div className="flex flex-col bg-base-200">
      <TitleBanner>
        <div className="py-16">와다닥에 오신것을 환영합니다!</div>
      </TitleBanner>
      <div className="flex justify-center py-16">
        <div className="card w-[450px] bg-base-100 shadow-2xl">
          <div className="card-body">
            {/* username */}
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">이메일</span>
              </label>
              <input
                type="text"
                id="username"
                className="input input-bordered"
                placeholder="이메일 입력"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* password */}
            <div className="form-control mt-4">
              <label className="label" htmlFor="password">
                <span className="label-text">비밀번호</span>
              </label>
              <input
                type="password"
                id="password"
                className="input input-bordered"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* login */}
            <div className="form-control mt-6">
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
