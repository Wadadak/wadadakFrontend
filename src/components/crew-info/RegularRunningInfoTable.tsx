import React from 'react';
import { RegularRunningInfo } from '@/types/crewTypes';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

interface RegularRunningInfoTableProps {
  regularRunningInfo: RegularRunningInfo[];
  userRole?: 'LEADER' | 'STAFF' | 'MEMBER';
  onEditRunningInfo?: (id: number | undefined) => void;
  onDeleteRunningInfo?: (id: number) => void;
}
const RegularRunningInfoTable = ({
  regularRunningInfo,
  userRole,
  onDeleteRunningInfo,
  onEditRunningInfo,
}: RegularRunningInfoTableProps) => {
  return (
    <div>
      {regularRunningInfo.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border-2 border-accent">
          <table className="table">
            <thead>
              <tr className="border-b border-accent bg-accent text-white">
                <th>지역</th>
                <th>주기</th>
                <th>요일</th>
                <th>시간</th>
                {userRole !== 'MEMBER' && <th className="w-[120px]"></th>}
              </tr>
            </thead>
            <tbody>
              {regularRunningInfo.map((info) => (
                <tr key={info.id}>
                  <td>{info.activityRegion}</td>
                  <td>
                    {info.week}주에 {info.count}번
                  </td>
                  <td>{info.dayOfWeek?.join(', ')}</td>

                  <td>{info.time || '시간 미정'}</td>
                  {userRole && (
                    <td className="flex gap-2 justify-end items-center max-w-[120px] min-w-[60px]">
                      {onEditRunningInfo && (
                        <Button
                          size="sm"
                          onClick={() => onEditRunningInfo(info.id)}
                        >
                          수정
                        </Button>
                      )}
                      {onDeleteRunningInfo && (
                        <Button
                          outline
                          size="sm"
                          onClick={() => onDeleteRunningInfo(info.id)}
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
        <p>정기 러닝 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default RegularRunningInfoTable;
