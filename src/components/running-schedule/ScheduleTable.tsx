import React from 'react';
import { UpcomingSchedule } from '@/types/crewTypes';

interface ScheduleTableProps {
  schedules: UpcomingSchedule[];
}

const ScheduleTable = ({ schedules }: ScheduleTableProps) => {
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
            <th className="w-[120px]"></th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.activityId}>
              <td>{schedule.date}</td>
              <td>{schedule.category === 'REGULAR' ? '정기' : '번개'}</td>
              <td>{schedule.title}</td>
              <td>
                {schedule.startTime} ~ {schedule.endTime}
              </td>
              <td>{schedule.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
