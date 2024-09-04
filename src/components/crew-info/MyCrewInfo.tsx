'use client';

import React, { useState } from 'react';
import CrewDetailInfo from '@/components/crew-info/CrewDetailInfo';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import { useParams, useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import RunningInfoForm from './RunningInfoForm';
import { useUserRoles } from '@/hooks/crew/useUserRoles';
import { RunningInfo } from '@/types/crewTypes';
import { useCrewInfo } from '@/hooks/crew/useCrewInfo';
import { useCrewRunningInfo } from '@/hooks/crew/useCrewRunningInfo';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';

const MyCrewInfo = () => {
  const { crewId } = useParams(); // useParams로 crewId 가져오기
  const crewIdNumber = parseInt(crewId as string, 10); // 문자열을 숫자로 변환
  const router = useRouter();

  // 모달 관리
  const deleteModal = useModal();
  const runningInfoEditModal = useModal();
  const runningInfoDeleteModal = useModal();

  // 상태 관리
  const [selectedInfo, setSelectedInfo] = useState<RunningInfo>();

  // 권한 조회
  const { data: userRoleData } = useUserRoles(crewIdNumber);
  const userRole = userRoleData?.role;

  // 크루 정보 조회
  const {
    data: crewData,
    isLoading: crewLoading,
    isError: crewError,
  } = useCrewInfo(crewIdNumber);

  // 정기 러닝 정보 조회
  const {
    data: runningInfoData,
    isLoading: runningInfoLoading,
    isError: runningInfoError,
  } = useCrewRunningInfo(crewIdNumber);

  if (crewLoading || runningInfoLoading) {
    return <LoadingSpinner />;
  }

  if (crewError || runningInfoError || !crewData) {
    return <ErrorComponent message="크루 정보를 불러오는데 실패했습니다." />;
  }

  const handleLeaveCrew = () => {
    // TODO 크루 탈퇴 API 연동
    alert('크루에서 탈퇴하셨습니다.');
    deleteModal.handleCloseModal();
    router.push('/');
  };

  const handleSaveRunningInfo = (info: RunningInfo) => {
    // TODO 추가/수정 API 연동
    console.log('저장된 정보:', info);
    runningInfoEditModal.handleCloseModal();
  };

  const openEditRunningInfoModal = (info: RunningInfo) => {
    setSelectedInfo(info);
    runningInfoEditModal.handleOpenModal();
  };

  const openDeleteRunningInfoModal = (info: RunningInfo) => {
    if (info && info.id !== undefined) {
      setSelectedInfo(info);
      runningInfoDeleteModal.handleOpenModal();
    }
  };

  const handleDeleteRunningInfoById = (id: number | undefined) => {
    if (id !== undefined) {
      const info = crew.regularRunningInfo?.find((info) => info.id === id);
      if (info) {
        openDeleteRunningInfoModal(info);
      }
    }
  };

  // 모달에서 삭제하는 함수
  const handleDeleteRunningInfo = () => {
    if (selectedInfo && selectedInfo.id !== undefined) {
      // TODO 삭제 API 연동
      console.log(`${selectedInfo.id}번 정기 러닝 정보를 삭제합니다.`);
      runningInfoDeleteModal.handleCloseModal();
    }
  };

  return (
    <>
      <CrewDetailInfo
        crew={crewData}
        myCrew={true}
        userRole={userRole}
        runningInfo={runningInfoData?.data || []}
        onEditRunningInfo={openEditRunningInfoModal}
        onDeleteRunningInfo={(id: number) =>
          openDeleteRunningInfoModal(runningInfoData?.crewId)
        }
      >
        {(userRole === 'LEADER' || userRole === 'STAFF') && (
          <Button>수정하기</Button>
        )}
        <Button outline onClick={deleteModal.handleOpenModal}>
          탈퇴하기
        </Button>
      </CrewDetailInfo>

      {/* 탈퇴 확인 모달 */}
      {deleteModal.isModalOpen && (
        <SimpleModal
          isOpen={deleteModal.isModalOpen}
          onClose={deleteModal.handleCloseModal}
          title={`정말 크루를 탈퇴하시겠습니까?`}
        >
          <div className="flex justify-end gap-2">
            <Button
              outline
              color="accent"
              onClick={handleLeaveCrew}
              type="submit"
            >
              예
            </Button>
            <Button
              color="accent"
              onClick={deleteModal.handleCloseModal}
              type="submit"
            >
              아니오
            </Button>
          </div>
        </SimpleModal>
      )}

      {/* 정기 러닝 정보 추가 or 수정 모달 */}
      {runningInfoEditModal.isModalOpen && (
        <SimpleModal
          isOpen={runningInfoEditModal.isModalOpen}
          onClose={runningInfoEditModal.handleCloseModal}
          title={selectedInfo ? '정기 러닝 정보 수정' : '정기 러닝 정보 추가'}
        >
          <RunningInfoForm
            initialInfo={selectedInfo}
            onSave={handleSaveRunningInfo}
          />
        </SimpleModal>
      )}

      {/* 정기 러닝 정보 삭제 확인 모달 */}
      {runningInfoDeleteModal.isModalOpen && (
        <SimpleModal
          isOpen={runningInfoDeleteModal.isModalOpen}
          onClose={runningInfoDeleteModal.handleCloseModal}
          title={`정말 ${selectedInfo?.activityRegion}에서의 정기 러닝 정보를 삭제하시겠습니까?`}
        >
          <div className="flex justify-end gap-2">
            <Button
              outline
              color="accent"
              onClick={handleDeleteRunningInfo}
              type="submit"
            >
              예
            </Button>
            <Button
              color="accent"
              onClick={runningInfoDeleteModal.handleCloseModal}
              type="button"
            >
              아니오
            </Button>
          </div>
        </SimpleModal>
      )}
    </>
  );
};

export default MyCrewInfo;
