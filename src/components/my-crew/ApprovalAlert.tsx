import React from 'react';
import Button from '../common/Button';
import { useParams, useRouter } from 'next/navigation';

const ApprovalAlert = () => {
  const router = useRouter();
  const { crewId } = useParams();

  const goToApprovalPage = () => {
    router.push(`/my-crews/${crewId}/approval`);
  };

  return (
    <div role="alert" className="alert shadow-lg mb-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 className="font-bold">
          현재 00명이 가입 승인을 기다리고 있습니다!
        </h3>
      </div>
      <Button size="sm" color="accent" onClick={goToApprovalPage}>
        확인하기
      </Button>
    </div>
  );
};

export default ApprovalAlert;
