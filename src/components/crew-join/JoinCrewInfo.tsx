'use client';

import React from 'react';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import CrewDetailInfo from '@/components/crew/CrewDetailInfo';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import { useParams } from 'next/navigation';
import Wrapper from '@/components/layout/Wrapper';
import useModal from '@/hooks/useModal';
import TextInput from '../common/TextInput';

const JoinCrewInfo = () => {
  const { crewId } = useParams();
  const id = parseInt(crewId as string, 10);
  const crew = mockCrewList.find((crew) => crew.crewId === id);

  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal();

  if (!crew) {
    return <Wrapper>크루 정보가 없습니다.</Wrapper>;
  }

  return (
    <>
      <CrewDetailInfo crew={crew}>
        <Button onClick={handleOpenModal}>가입 신청</Button>
      </CrewDetailInfo>
      {isModalOpen && (
        <SimpleModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="가입 신청 메시지 (100자 이내)"
        >
          <div className="flex flex-col">
            <TextInput as="textarea" maxLength={100} width="" />
            <div className="flex justify-end">
              <Button color="accent">제출하기</Button>
            </div>
          </div>
        </SimpleModal>
      )}
    </>
  );
};

export default JoinCrewInfo;
