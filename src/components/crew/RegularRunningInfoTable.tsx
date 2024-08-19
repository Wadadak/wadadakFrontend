import React from 'react';
import { RegularRunningInfo } from '@/types/crewTypes';

interface RegularRunningInfoTableProps {
  regularRunningInfo: RegularRunningInfo[];
}
const RegularRunningInfoTable = ({
  regularRunningInfo,
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
              </tr>
            </thead>
            <tbody>
              {regularRunningInfo.map((info) => (
                <tr key={info.id}>
                  <td>{info.location}</td>
                  <td>
                    {info.frequency.weeks}주에 {info.frequency.times}번
                  </td>
                  <td>{info.weekdays.join(', ')}</td>
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
