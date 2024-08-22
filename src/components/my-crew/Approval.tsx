import React, { useState } from 'react';
import AllMemberList from '@/components/my-crew/AllMemberList';
import Button from '@/components/common/Button';
import { mockCrewMembers } from '@/mocks/mockData/mockCrewMembers';

const Approval = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <AllMemberList members={mockCrewMembers}>
      <Button size="sm" color="secondary">
        승인
      </Button>
      <Button size="sm">거절</Button>
    </AllMemberList>
  );
};

export default Approval;
