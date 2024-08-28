'use client';

import React, { useState } from 'react';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import RunningScheduleForm from './RunningScheduleForm';
import { RunningSchedule } from '@/types/crewTypes';
import useModal from '@/hooks/useModal';

// Mock Data
const mockSchedules: RunningSchedule[] = [
  {
    activityId: '1',
    title: '아침에 같이 러닝 하시죠?!',
    category: 'REGULAR',
    date: '2023-12-01',
    startTime: '07:00',
    endTime: '08:00',
    location: '서울숲',
    memo: '아침 공기가 상쾌해요!',
    regularId: 1,
    author: '하이요',
    participant: 10,
  },
  {
    activityId: '2',
    title: '저녁 러닝',
    category: 'ON_DEMAND',
    date: '2023-12-02',
    startTime: '19:00',
    endTime: '20:00',
    location: '한강공원',
    memo: '주말 저녁 한강에서!',
    author: '응응',
    participant: 20,
  },
];

const CrewRunningSchedule = () => {
  const [schedules, setSchedules] = useState<RunningSchedule[]>(mockSchedules); // FIXME 목데이터
  const [selectedSchedule, setSelectedSchedule] =
    useState<RunningSchedule | null>(null);

  const runningScheduleModal = useModal();
  const deleteModal = useModal();

  const currentUser = '하이요'; // 실제로는 로그인한 사용자의 이름 또는 ID를 사용
  const userRole = 'LEADER'; // 실제로는 API를 통해 받아오는 사용자의 역할

  // 일정 생성자, 스탭, 리더만 수정 및 삭제 가능
  const canManageSchedule = (schedule: RunningSchedule) => {
    return (
      schedule.author === currentUser ||
      userRole === 'LEADER' ||
      userRole === 'STAFF'
    );
  };

  const openEditScheduleModal = (schedule: RunningSchedule | null) => {
    setSelectedSchedule(schedule);
    runningScheduleModal.handleOpenModal();
  };

  const openDeleteScheduleModal = (schedule: RunningSchedule) => {
    if (schedule && schedule.activityId !== undefined) {
      setSelectedSchedule(schedule); // 삭제할 일정 데이터 설정
      deleteModal.handleOpenModal();
    }
  };

  const handleSaveRunningSchedule = (schedule: RunningSchedule) => {
    if (selectedSchedule) {
      // 수정 로직
      setSchedules((prevSchedules) =>
        prevSchedules.map((s) =>
          s.activityId === schedule.activityId ? schedule : s,
        ),
      );
    } else {
      // 추가 로직
      setSchedules((prevSchedules) => [...prevSchedules, schedule]);
    }
    runningScheduleModal.handleCloseModal();
  };

  const handleDeleteRunningSchedule = () => {
    if (selectedSchedule) {
      setSchedules((prevSchedules) =>
        prevSchedules.filter(
          (s) => s.activityId !== selectedSchedule.activityId,
        ),
      );
      deleteModal.handleCloseModal();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center pb-2">
        <p className="card-title">다가오는 오프라인 러닝</p>
        <Button
          onClick={() => openEditScheduleModal(null)}
          size="sm"
          color="secondary"
        >
          러닝 일정 추가
        </Button>
      </div>
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
                  {schedule.startTime} - {schedule.endTime}
                </td>
                <td>{schedule.location}</td>
                {(userRole === 'LEADER' ||
                  userRole === 'STAFF' ||
                  schedule.author === currentUser) && (
                  <td className="flex gap-2 justify-end items-center max-w-[120px] min-w-[60px]">
                    <Button
                      size="sm"
                      onClick={() => openEditScheduleModal(schedule)}
                    >
                      수정
                    </Button>
                    <Button
                      outline
                      size="sm"
                      onClick={() => openDeleteScheduleModal(schedule)}
                    >
                      삭제
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 일정 추가 or 수정 모달 */}
      <SimpleModal
        isOpen={runningScheduleModal.isModalOpen}
        onClose={runningScheduleModal.handleCloseModal}
        title={selectedSchedule ? '일정 수정' : '일정 추가'}
      >
        <RunningScheduleForm
          initialInfo={selectedSchedule}
          onSave={handleSaveRunningSchedule}
        />
      </SimpleModal>
      {/* 정기 러닝 정보 삭제 확인 모달 */}
      <SimpleModal
        isOpen={deleteModal.isModalOpen}
        onClose={deleteModal.handleCloseModal}
        title="정말로 일정을 삭제하시겠습니까?"
      >
        <div className="flex justify-end gap-2">
          <Button
            outline
            color="accent"
            onClick={handleDeleteRunningSchedule}
            type="submit"
          >
            예
          </Button>
          <Button
            color="accent"
            onClick={deleteModal.handleCloseModal}
            type="button"
          >
            아니오
          </Button>
        </div>
      </SimpleModal>
    </>
  );
};

export default CrewRunningSchedule;
