'use client';

import Button from '@/components/common/Button';
import { TitleBanner } from '@/components/layout/TitleBanner';

const AlarmPage = () => {
  return (
    <div>
      <TitleBanner>알람</TitleBanner>
      <div className="flex flex-col space-y-4 justify-center items-center py-40">
        <AlarmItem
          title={'1:1 채팅 요청이 왔어요'}
          subTitle={'ㅇㅇ님께서 1:1 채팅을 신청하셨어요!'}
          buttonName={'수락하기'}
          onButtonClick={() => {}}
        />
        <AlarmItem
          title={'ㅇㅇ크루 공지사항을 확인하세요!'}
          subTitle={
            '이번주 화요일에 생태공원에서 모이기로 했던 일정은 우천으로 취소합니다. 그래서 회비는 다시 돌려드릴게요. 계좌를 댓글로 남겨주시면....'
          }
          buttonName={'확인하기'}
          onButtonClick={() => {}}
        />
        <AlarmItem
          title={'내 러닝 기록에 피드백이 달렸어요!'}
          subTitle={
            '2024-08-03일에 12.6km를 5’36’’ 페이스로 달린 내 기록에 ㅁㅁㅁㅁ님이 피드백을 달아주었어요. 확인하러 달려가요!'
          }
          buttonName={'확인하기'}
          onButtonClick={() => {}}
        />
      </div>
    </div>
  );
};

export default AlarmPage;

interface AlarmItemProps {
  title: string;
  subTitle: string;
  buttonName: string;
  onButtonClick: () => void;
}

const AlarmItem = ({
  title,
  subTitle,
  buttonName,
  onButtonClick,
}: AlarmItemProps) => {
  return (
    <div className="flex w-[700px] items-center space-x-4 border p-4 rounded-lg">
      <div className="bg-gray-300 rounded w-[100px] h-[100px] shrink-0">
        이미지
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-3">
          <div className="text-[20px] font-bold">{title}</div>
          <div className="text-[12px] text-gray-500">{subTitle}</div>
        </div>
        <div>
          <Button onClick={onButtonClick} size="sm">
            {buttonName}
          </Button>
        </div>
      </div>
    </div>
  );
};
