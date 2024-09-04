'use client';

import React, { useState } from 'react';
import AllMemberList from './AllMemberList';
import Button from '../common/Button';
import ApprovalAlert from './ApprovalAlert';
import SimpleModal from '../common/SimpleModal';
import { useParams } from 'next/navigation';
import { useUserRoles } from '@/hooks/crew/useUserRoles';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorComponent from '../common/ErrorComponent';

const CrewMemberList = () => {
  const { crewId } = useParams();
  const id = parseInt(crewId as string, 10);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useUserRoles(id);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorComponent message={error.message || '권한을 조회할 수 없습니다.'} />
    );

  const step = data?.role === 'LEADER' || data?.role === 'STAFF';

  return (
    <>
      {/* {step && <ApprovalAlert />} */}
      <AllMemberList crewId={id}>
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
