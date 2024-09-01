'use client';

import Label from '@/components/common/Label';
import TextInput from '@/components/common/TextInput';
import { TitleBanner } from '@/components/layout/TitleBanner';
import { useLogin } from '@/hooks/user/useLogin';
import { mockMyInfo } from '@/mocks/mockData/mockMyInfo';
import { loginState } from '@/recoil/atoms/userState';
import { LoginRequest } from '@/types/userTypes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const LoginPage = () => {
  const [isLogin, setLogin] = useRecoilState(loginState);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
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

    const body: LoginRequest = {
      email,
      password,
    };

    login(body);
  };

  const { mutate: login } = useLogin(
    (data) => {
      setLogin(true);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      alert('로그인 성공');
      router.push('/');
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
                type="password"
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


const decodeBase64Url = (base64Url: string): string => {
  // Base64Url을 Base64로 변환
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  // Base64 문자열을 디코딩하여 문자열로 변환
  return atob(base64);
};

export const extractUserIdFromToken = (token: string): number | null => {
  try {
    // JWT를 점(.)으로 나눔
    const [header, payload, signature] = token.split('.');

    if (!payload) {
      throw new Error('Invalid JWT token');
    }

    // Payload 디코딩
    const decodedPayload = decodeBase64Url(payload);
    // JSON으로 파싱
    const payloadObject = JSON.parse(decodedPayload);

    // 사용자 ID 추출
    const userId = payloadObject.userId;

    if (typeof userId === 'number') {
      return userId;
    } else {
      throw new Error('User ID not found in the payload');
    }
  } catch (error) {
    console.error('Failed to extract user ID from token:', error);
    return null;
  }
};

//aaa1@gmail.com
// {
//   "accessJwt": "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcklkIjoyMSwic3ViIjoiYWFhMUBnbWFpbC5jb20iLCJpYXQiOjE3MjUxNjM1MDYsImV4cCI6MTcyNTE2NTMwNn0.tcLi3ToM1aO7kllb-O5G8itm3XoI0oIazqZg06nSRiE",
//   "refreshJwt": "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcklkIjoyMSwic3ViIjoiYWFhMUBnbWFpbC5jb20iLCJpYXQiOjE3MjUxNjM1MDcsImV4cCI6MTcyNTc2ODMwN30.lIzMvrhLQJ-kWyR6RUBd_Svj0mzlx79ChlLCw0Q1lt0"
// }