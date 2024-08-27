'use client';

import React, { useState } from 'react';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import CrewDetailInfo from '@/components/crew/CrewDetailInfo';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import { useParams, useRouter } from 'next/navigation';
import Wrapper from '@/components/layout/Wrapper';
import useModal from '@/hooks/useModal';
import RunningInfoForm from './RunningInfoForm';
import { RegularRunningInfo } from '@/types/crewTypes';

const MyCrewInfo = () => {
  const { crewId } = useParams();
  const crew = mockCrewList.find((c) => c.crewId === Number(crewId)); // TODO 실제 데이터로 교체
  const userRole = 'LEADER'; // TODO 실제 사용자 역할로 교체

  const deleteModal = useModal();
  const runningInfoEditModal = useModal();
  const runningInfoDeleteModal = useModal();
  const [selectedInfo, setSelectedInfo] = useState<RegularRunningInfo | null>(
    null,
  );
  const router = useRouter();

  if (!crew) {
    return <Wrapper>크루 정보가 없습니다.</Wrapper>;
  }

  const handleLeaveCrew = () => {
    // TODO 크루 탈퇴 API 연동
    alert(`${crew.crewName}에서 탈퇴하셨습니다.`);
    deleteModal.handleCloseModal();
    router.push('/');
  };

  const handleEditCrewInfo = () => {
    // 크루 정보 수정 페이지로 이동 또는 수정 로직 추가
  };

  const handleSaveRunningInfo = (info: RegularRunningInfo) => {
    // TODO 추가/수정 API 연동
    console.log('저장된 정보:', info);
    runningInfoEditModal.handleCloseModal();
  };

  const openEditRunningInfoModal = (info: RegularRunningInfo | null) => {
    setSelectedInfo(info);
    runningInfoEditModal.handleOpenModal();
  };

  const openDeleteRunningInfoModal = (info: RegularRunningInfo) => {
    if (info && info.id !== undefined) {
      setSelectedInfo(info);
      runningInfoDeleteModal.handleOpenModal();
    }
  };

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
        crew={crew}
        userRole={userRole}
        canManage={true}
        onEditRunningInfo={openEditRunningInfoModal}
        onDeleteRunningInfo={handleDeleteRunningInfo}
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
        >
          <RunningInfoForm
            initialInfo={selectedInfo}
            onSave={handleSaveRunningInfo}
          />
        </SimpleModal>
      )}
    </>
  );
};

export default MyCrewInfo;
