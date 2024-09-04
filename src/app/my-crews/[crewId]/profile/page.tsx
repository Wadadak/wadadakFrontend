'use client';

import { MyRecordItem } from '../../../my/page';
import { useCrewMemberInfo } from '@/hooks/crew/useCrewMemberInfo';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useRegions } from '@/hooks/useRegions';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const ProfilePage = () => {
  const { crewId, memberId } = useParams();
  const { data: regionList } = useRegions();
  const { data, isLoading } = useCrewMemberInfo(
    Number(crewId),
    Number(memberId),
  );

  return isLoading ? (
    <div className="flex items-center justify-center w-full py-10">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="flex items-center justify-center py-40 space-x-5">
      <div className="bg-slate-200 w-[350px] h-[350px] rounded-[16px] overflow-hidden">
        {data?.memberProfileImage}
      </div>
      <div className="flex flex-col items-center space-y-3">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-[32px] font-bold">
            {data?.memberNickName || '닉네임은니모니모'}
          </div>
          <div className="text-[16px] text-gray-500">
            {data?.birthYear ? data?.birthYear + '생' : '출생연도 비공개'}/
            {data?.memberGender === 'MALE'
              ? '남성'
              : data?.memberGender === 'FEMALE'
                ? '여성'
                : '성별 비공개'}
            /
            {regionList?.find((el) => el.id === data?.memberActivityRegion)
              ?.name || '활동지역 비공개'}
          </div>
        </div>
        <div className="flex flex-col p-6 space-y-8 border rounded-lg">
          <div className="flex flex-col items-center space-y-1">
            <div className="text-[50px] font-extrabold">2453.3km</div>
            <div className="font-bold">총 거리</div>
          </div>
          <div className="flex justify-center px-4 mt-8 space-x-16">
            <MyRecordItem
              record={'128'}
              name={'총 러닝 횟수'}
              iconStyle="!w-6 !h-6"
              recordStyle="text-3xl"
              nameStyle="text-[13px]"
            />
            <MyRecordItem
              record={'5\'32"'}
              name={'평균 페이스'}
              iconStyle="!w-6 !h-6"
              recordStyle="text-3xl"
              nameStyle="text-[13px]"
            />
            <MyRecordItem
              record={'164h23m'}
              name={'누적 러닝시간'}
              iconStyle="!w-6 !h-6"
              recordStyle="text-3xl"
              nameStyle="text-[13px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
