import React from 'react';
import { UpcomingSchedule } from '@/types/crewTypes';
import Button from '../common/Button';

interface ScheduleTableProps {
  schedules: UpcomingSchedule[];
  canManageSchedule?: (schedule: UpcomingSchedule) => boolean; // 항상 boolean을 반환하는 함수로 변경
}

const ScheduleTable = ({
  schedules,
  canManageSchedule,
}: ScheduleTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border-2 border-accent">
      <table className="table">
        <thead>
          <tr className="border-b border-accent bg-accent text-white">
            <th>날짜</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>시간</th>
            <th>장소</th>
            {canManageSchedule && <th className="w-[120px]"></th>}
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.activityId}>
              <td>{schedule.date}</td>
              <td>{schedule.category === 'REGULAR' ? '정기' : '번개'}</td>
              <td>
                {schedule.title
                  ? schedule.title
                  : `${schedule.date} ${schedule.category === 'REGULAR' ? '정기' : '번개'}`}
              </td>
              <td>
                {schedule.startTime} ~ {schedule.endTime}
              </td>
              <td>{schedule.location}</td>
              {canManageSchedule && canManageSchedule(schedule) && (
                <td className="flex gap-2 justify-end items-center max-w-[120px] min-w-[60px]">
                  <Button size="sm">수정</Button>
                  <Button outline size="sm">
                    삭제
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
