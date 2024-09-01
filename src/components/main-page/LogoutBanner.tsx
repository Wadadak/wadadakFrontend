import React from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

export const LogoutBanner = () => {
  const router = useRouter();

  const handleButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/signup');
  };
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">
        당신의 러닝 크루를 찾아보세요!
      </h1>
      <p className="text-lg">최고의 러닝 크루와 함께 성장할 준비가 되셨나요?</p>
      <p className="text-lg mb-4">
        지금 가입하고 나에게 딱 맞는 러닝 크루를 찾아보세요!
      </p>
      <Button color="secondary" wide onClick={handleButtonClick}>
        지금 바로 가입하기!
      </Button>
    </>
  );
};
