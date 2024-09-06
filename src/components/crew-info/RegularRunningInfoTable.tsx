import React from 'react';
import { RunningInfo } from '@/types/crewTypes';
import Button from '../common/Button';

const weekdayMap: { [key: string]: string } = {
  monday: '월요일',
  tuesday: '화요일',
  wednesday: '수요일',
  thursday: '목요일',
  friday: '금요일',
  saturday: '토요일',
  sunday: '일요일',
};

// 요일 ID를 한글 요일명으로 변환하는 함수
const getKoreanDayNames = (dayIds: string[]) => {
  return dayIds.map((dayId) => weekdayMap[dayId]);
};

interface RegularRunningInfoTableProps {
  regularRunningInfo?: RunningInfo[];
  userRole?: 'LEADER' | 'STAFF' | 'MEMBER';
  onEditRunningInfo?: (info: RunningInfo) => void;
  onDeleteRunningInfo?: (id: number) => void;
  myCrew?: boolean;
}
const RegularRunningInfoTable = ({
  regularRunningInfo = [],
  userRole,
  onDeleteRunningInfo,
  onEditRunningInfo,
  myCrew,
}: RegularRunningInfoTableProps) => {
  return (
    <div>
      {regularRunningInfo?.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border-2 border-accent">
          <table className="table">
            <thead>
              <tr className="border-b border-accent bg-accent text-white">
                <th>지역</th>
                <th>주기</th>
                <th>요일</th>
                <th>시간</th>
                {userRole !== 'MEMBER' && myCrew && (
                  <th className="w-[120px]"></th>
                )}
              </tr>
            </thead>
            <tbody>
              {regularRunningInfo.map((info) => (
                <tr key={info.id}>
                  <td>{info.activityRegion}</td>
                  <td>
                    {info.week}주에 {info.count}번
                  </td>
                  <td>{getKoreanDayNames(info.dayOfWeek)?.join(', ')}</td>
                  <td>{info.time || '시간 미정'}</td>
                  {userRole !== 'MEMBER' && myCrew && (
                    <td className="flex gap-2 justify-end items-center max-w-[120px] min-w-[60px]">
                      {/* {onEditRunningInfo && info.id !== undefined && ( */}
                      {onEditRunningInfo && (
                        <Button
                          size="sm"
                          onClick={() => onEditRunningInfo(info)}
                        >
                          수정
                        </Button>
                      )}
                      {onDeleteRunningInfo && (
                        <Button
                          outline
                          size="sm"
                          onClick={() => onDeleteRunningInfo(info.id!)}
                        >
                          삭제
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-5">
          <p className="text-lg">정기 러닝 정보가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default RegularRunningInfoTable;
