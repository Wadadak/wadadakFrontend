'use client';

import React, { useEffect, useState } from 'react';
import CrewDetailInfo from '@/components/crew-info/CrewDetailInfo';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import Wrapper from '@/components/layout/Wrapper';
import useModal from '@/hooks/useModal';
import TextInput from '../common/TextInput';
import { useApplyForCrew } from '@/hooks/crew/useApplyForCrew';
import { useUserRoles } from '@/hooks/crew/useUserRoles';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/apis/authService';

interface JoinCrewInfoProps {
  crewId: number;
}

const JoinCrewInfo = ({ crewId }: JoinCrewInfoProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const messageModal = useModal();
  const confirmModal = useModal();
  // const cancelModal = useModal();
  const [message, setMessage] = useState<string>();
  const router = useRouter();

  // 로그인 유무 확인 위해 accessToken 가져옴
  useEffect(() => {
    const token = getAccessToken;
    setAccessToken(token);
  }, []);

  // 사용자 권한 확인
  const { data: userRoleData } = useUserRoles(crewId);
  const isMember =
    userRoleData?.role === 'MEMBER' ||
    userRoleData?.role === 'LEADER' ||
    userRoleData?.role === 'STAFF';

  const mutation = useApplyForCrew();

  const handleSubmit = () => {
    messageModal.handleCloseModal();
    confirmModal.handleOpenModal();
  };

  const handleFinalSubmit = () => {
    if (accessToken && !isMember) {
      mutation.mutate(
        { crewId, message },
        {
          onSuccess: () => {
            confirmModal.handleCloseModal();
            alert('가입이 완료되었습니다!');
          },
          onError: () => {
            alert('가입 신청에 실패했습니다. 다시 시도해 주세요.');
          },
        },
      );
    }
  };

  const handleJoinClick = () => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      router.push('/login'); // 로그인 페이지로 리디렉션
    } else if (!isMember) {
      messageModal.handleOpenModal();
    }
  };

  // NOTE 가입 승인
  // const handleCancel = () => {
  //   setIsPendingApproval(false);
  //   setMessage('');
  //   alert('가입 신청이 취소되었습니다.');
  //   cancelModal.handleCloseModal();
  // };

  return (
    <Wrapper>
      <CrewDetailInfo crewId={crewId}>
        {!isMember && <Button onClick={handleJoinClick}>가입 신청</Button>}
        {/* NOTE 가입 승인 */}
        {/* {isPendingApproval ? (
          <div className="flex gap-2">
            <Button onClick={messageModal.handleOpenModal}>수정하기</Button>
            <Button outline onClick={cancelModal.handleOpenModal}>
              취소하기
            </Button>
          </div>
        ) : (
          <Button onClick={messageModal.handleOpenModal}>가입 신청</Button>
        )} */}
      </CrewDetailInfo>
      {messageModal.isModalOpen && (
        <SimpleModal
          isOpen={messageModal.isModalOpen}
          onClose={messageModal.handleCloseModal}
          title="가입 신청 메시지 (100자 이내)"
        >
          <div className="flex flex-col gap-4">
            <TextInput
              value={message}
              onChange={(e) => setMessage(e)}
              as="textarea"
              maxLength={100}
              width="xl"
            />
            <div className="flex justify-end">
              <Button color="accent" onClick={handleSubmit} type="submit">
                제출하기
              </Button>
            </div>
          </div>
        </SimpleModal>
      )}
      {confirmModal.isModalOpen && (
        <SimpleModal
          isOpen={confirmModal.isModalOpen}
          onClose={confirmModal.handleCloseModal}
          title="정말 이 메시지를 제출하시겠습니까?"
        >
          <div className="flex flex-col gap-4">
            <div>{message}</div>
            <div className="flex justify-end gap-2">
              <Button color="accent" type="submit">
                {/* <Button color="accent" onClick={handleFinalSubmit} type="submit"> */}
                예
              </Button>
              <Button
                color="accent"
                onClick={confirmModal.handleCloseModal}
                type="submit"
              >
                아니오
              </Button>
            </div>
          </div>
        </SimpleModal>
      )}

      {/* NOTE 가입 승인 */}
      {/* {cancelModal.isModalOpen && (
        <SimpleModal
          isOpen={cancelModal.isModalOpen}
          onClose={cancelModal.handleCloseModal}
          title="정말 크루 신청을 취소하시겠습니까?"
        >
          <div className="flex justify-end gap-2">
            <Button color="accent" onClick={handleCancel} type="submit">
              예
            </Button>
            <Button
              color="accent"
              onClick={cancelModal.handleCloseModal}
              type="submit"
            >
              아니오
            </Button>
          </div>
        </SimpleModal>
      )} */}
    </Wrapper>
  );
};

export default JoinCrewInfo;
