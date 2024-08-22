'use client';

import React, { useState } from 'react';
import AllMemberList from './AllMemberList';
import Button from '../common/Button';
import { mockCrewMembers } from '@/mocks/mockData/mockCrewMembers';
import ApprovalAlert from './ApprovalAlert';
import SimpleModal from '../common/SimpleModal';

// ui 테스트용
interface CrewMemberListProps {
  step?: boolean;
}

const CrewMemberList = ({ step }: CrewMemberListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {step && <ApprovalAlert />}
      <AllMemberList members={mockCrewMembers}>
        <Button size="sm">1:1 채팅</Button>
        {step && (
          <Button outline size="sm" onClick={handleOpenModal}>
            강제 탈퇴
          </Button>
        )}
      </AllMemberList>
      {isModalOpen && (
        <SimpleModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="정말 탈퇴 시키겠습니까?"
        >
          <div className="flex justify-end gap-2">
            <Button outline color="accent">
              예
            </Button>
            <Button color="accent" onClick={handleCloseModal}>
              아니요
            </Button>
          </div>
        </SimpleModal>
      )}
    </>
  );
};

export default CrewMemberList;
