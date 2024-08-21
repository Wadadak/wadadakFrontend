'use client';

import { MyRecordItem } from '../page';

const DetailPage = () => {
  return (
    <div className="flex justify-center items-center space-x-5 py-40">
      <div className="bg-slate-200 w-[350px] h-[350px]">이미지</div>
      <div className="flex flex-col items-center space-y-3">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-[32px] font-bold">NickName</div>
          <div className="text-[12px] text-gray-500">25세 여자 서울 강서구</div>
        </div>
        <div className="flex flex-col space-y-8 border p-6 rounded-lg">
          <div className="flex flex-col items-center space-y-1">
            <div className="text-[50px] font-extrabold">2453.3km</div>
            <div className="font-bold">총 거리</div>
          </div>
          <div className="flex justify-center mt-8 space-x-16">
            <MyRecordItem
              record={'128'}
              name={'총 러닝 횟수'}
              iconStyle="!w-6 !h-6"
              recordStyle="text-3xl"
              nameStyle="text-[13px]"
            />
            <MyRecordItem
              record={"5'32''"}
              name={'평균 페이스'}
              iconStyle="!w-6 !h-6"
              recordStyle="text-3xl"
              nameStyle="text-[13px]"
            />
            <MyRecordItem
              record={'164'}
              name={'평균 칼로리'}
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

export default DetailPage;
