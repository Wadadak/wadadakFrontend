'use client';

import React, { useState } from 'react';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import { UpcomingSchedule } from '@/types/crewTypes';
import { useUpcomingRunningSchedules } from '@/hooks/schedule/useUpcomingRunningSchedules';
import useModal from '@/hooks/useModal';
import { useRouter, useParams } from 'next/navigation';
import { useUserRoles } from '@/hooks/crew/useUserRoles';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';
import Pagination from '../common/Pagination';
import ScheduleTable from './ScheduleTable';

const CrewRunningSchedule = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // 한 페이지에 표시할 항목
  const pageRangeDisplayed = 5;

  const { crewId } = useParams(); // 크루 ID를 URL에서 가져옴
  const crewIdNumber = parseInt(crewId as string, 10); // 문자열을 숫자로 변환

  const [selectedSchedule, setSelectedSchedule] = useState<UpcomingSchedule>();

  const deleteModal = useModal();
  const router = useRouter();

  // const currentUser = '하이요'; // 실제로는 로그인한 사용자의 이름 또는 ID를 사용

  // 권한 조회
  const { data: userRoleData } = useUserRoles(crewIdNumber);
  const role = userRoleData?.role;

  // 다가오는 러닝 일정 조회
  const {
    data: schedulesData,
    isLoading,
    error,
  } = useUpcomingRunningSchedules(crewIdNumber, {
    size: itemsPerPage,
    page: currentPage,
  });

  // Pagination 데이터
  const schedules = schedulesData?.schedules || [];
  const totalPages = schedulesData?.totalPages || 1;

  // 일정 생성자, 스탭, 리더만 수정 및 삭제 가능
  const canManageSchedule = (schedule: UpcomingSchedule) => {
    if (!userRoleData) return false;
    return (
      // schedule.author === currentUser ||
      role === 'LEADER' || role === 'STAFF'
    );
  };

  const handleAddSchedule = () => {
    router.push(`/my-crews/${crewId}/schedule/new`);
  };

  const handleEditSchedule = (activityId: number) => {
    router.push(`/my-crews/${crewId}/schedule/edit/${activityId}`);
  };

  const openDeleteScheduleModal = (schedule: UpcomingSchedule) => {
    if (schedule && schedule.activityId !== undefined) {
      setSelectedSchedule(schedule); // 삭제할 일정 데이터 설정
      deleteModal.handleOpenModal();
    }
  };

  const handleDeleteRunningSchedule = (activityId: number) => {
    if (selectedSchedule) {
      // 실제 API 호출로 삭제 요청을 보냄 (예: deleteRunningSchedule API 호출)
      // 삭제된 데이터가 성공적으로 처리되면 state 업데이트로 UI에 반영
      deleteModal.handleCloseModal();
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorComponent
        message={error.message || '데이터를 불러오는 중 오류가 발생했습니다.'}
      />
    );
  }

  console.log('Received data:', schedulesData);

  return (
    <>
      <div className="flex justify-between items-center pb-2">
        <p className="card-title">다가오는 러닝 일정</p>
        <Button onClick={handleAddSchedule} size="sm" color="secondary">
          러닝 일정 추가
        </Button>
      </div>
      {schedules?.length > 0 ? (
        <>
          <ScheduleTable schedules={schedules} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            pageRangeDisplayed={pageRangeDisplayed}
          />

          <SimpleModal
            isOpen={deleteModal.isModalOpen}
            onClose={deleteModal.handleCloseModal}
            title="정말로 일정을 삭제하시겠습니까?"
          >
            <div className="flex justify-end gap-2">
              <Button
                outline
                color="accent"
                onClick={() =>
                  handleDeleteRunningSchedule(selectedSchedule?.activityId!)
                }
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
      ) : (
        <div className="text-center py-10">
          <p className="text-lg">현재 표시할 일정이 없습니다.</p>
        </div>
      )}
    </>
  );
};

export default CrewRunningSchedule;
