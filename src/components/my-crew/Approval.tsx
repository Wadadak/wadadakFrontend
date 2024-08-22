'use client';

import React from 'react';
import AllMemberList from '@/components/my-crew/AllMemberList';
import Button from '@/components/common/Button';
import SimpleModal from '../common/SimpleModal';
import { mockCrewMembers } from '@/mocks/mockData/mockCrewMembers';
import useModal from '@/hooks/useModal';

const Approval = () => {
  const approvalModal = useModal();
  const rejectionModal = useModal();

  return (
    <>
      <AllMemberList
        members={mockCrewMembers}
        title="가입 승인 대기자"
        search={false}
      >
        <Button
          size="sm"
          color="secondary"
          onClick={approvalModal.handleOpenModal}
        >
          승인
        </Button>
        <Button size="sm" onClick={rejectionModal.handleOpenModal}>
          거절
        </Button>
      </AllMemberList>
      {approvalModal.isModalOpen && (
        <SimpleModal
          isOpen={approvalModal.isModalOpen}
          onClose={approvalModal.handleCloseModal}
          title="정말 승인하시겠습니까?"
        >
          <div className="flex justify-end gap-2">
            <Button color="accent" outline>
              예
            </Button>
            <Button color="accent" onClick={approvalModal.handleCloseModal}>
              아니요
            </Button>
          </div>
        </SimpleModal>
      )}
      {rejectionModal.isModalOpen && (
        <SimpleModal
          isOpen={rejectionModal.isModalOpen}
          onClose={rejectionModal.handleCloseModal}
          title="정말 거절하시겠습니까?"
        >
          <div className="flex justify-end gap-2">
            <Button outline color="accent">
              예
            </Button>
            <Button color="accent" onClick={rejectionModal.handleCloseModal}>
              아니요
            </Button>
          </div>
        </SimpleModal>
      )}
    </>
  );
};

export default Approval;
