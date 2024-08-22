'use client';

import React from 'react';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import CrewDetailInfo from '@/components/crew/CrewDetailInfo';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import { useParams, useRouter } from 'next/navigation';
import Wrapper from '@/components/layout/Wrapper';
import useModal from '@/hooks/useModal';

interface MyCrewInfoProps {
  step?: boolean;
}

const MyCrewInfo = ({ step = false }: MyCrewInfoProps) => {
  const { crewId } = useParams();
  const id = parseInt(crewId as string, 10);
  const crew = mockCrewList.find((crew) => crew.crewId === id);

  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal();
  const router = useRouter();

  if (!crew) {
    return <Wrapper>크루 정보가 없습니다.</Wrapper>;
  }

  const handleLeaveCrew = () => {
    alert(`${crew.crewName}에서 탈퇴하셨습니다.`);
    handleCloseModal();
    router.push('/');
  };

  const handleRunningInfo = () => {
    router.push(`/my-crews/${crewId}/info/regular-running`); // 정기 러닝 정보 관리 페이지로 이동
  };

  return (
    <>
      {step && (
        <div className="flex justify-end mb-4">
          <Button size="sm" color="secondary" onClick={handleRunningInfo}>
            정기 러닝 정보 추가 / 수정
          </Button>
        </div>
      )}
      <CrewDetailInfo crew={crew}>
        {step && <Button>수정하기</Button>}
        <Button outline onClick={handleOpenModal}>
          탈퇴하기
        </Button>
      </CrewDetailInfo>
      {isModalOpen && (
        <SimpleModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
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
            <Button color="accent" onClick={handleCloseModal} type="submit">
              아니오
            </Button>
          </div>
        </SimpleModal>
      )}
      {}
    </>
  );
};

export default MyCrewInfo;
