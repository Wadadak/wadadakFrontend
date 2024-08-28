'use client';

import React, { useState } from 'react';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import CrewDetailInfo from '@/components/crew-info/CrewDetailInfo';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import { useParams } from 'next/navigation';
import Wrapper from '@/components/layout/Wrapper';
import useModal from '@/hooks/useModal';
import TextInput from '../common/TextInput';

const JoinCrewInfo = () => {
  const crew = mockCrewList[0];

  const messageModal = useModal();
  const confirmModal = useModal();
  const cancelModal = useModal();
  const [message, setMessage] = useState('');
  // TODO api 연결시 useQuery 사용
  const [isPendingApproval, setIsPendingApproval] = useState(false);

  // TODO API 연결 시 useMutation 사용
  // const mutation = useMutation(sendMessage, {
  //   onSuccess: () => {
  //     alert('메시지가 성공적으로 전송되었습니다.');
  //     onClose(); // 전송 성공 시 모달 닫기
  //   },
  //   onError: () => {
  //     alert('메시지 전송에 실패했습니다.');
  //   },
  // });

  const handleSubmit = () => {
    console.log('가입 신청 메시지:', message);
    messageModal.handleCloseModal();
    confirmModal.handleOpenModal();
  };

  const handleFinalSubmit = () => {
    // TODO API 연결 시 mutation.mutate(message);로 변경
    console.log('가입 신청 메시지:', message);
    confirmModal.handleCloseModal();
    alert('가입이 완료되었습니다!');
    // NOTE 가입 승인
    // if (crew?.approvalRequired) {
    //   setIsPendingApproval(true);
    //   alert('가입 신청이 완료되었습니다. 관리자의 승인을 기다려주세요.');
    // } else {
    //   alert('가입이 완료되었습니다!');
    // }
  };

  // NOTE 가입 승인
  // const handleCancel = () => {
  //   setIsPendingApproval(false);
  //   setMessage('');
  //   alert('가입 신청이 취소되었습니다.');
  //   cancelModal.handleCloseModal();
  // };

  if (!crew) {
    return <Wrapper>크루 정보가 없습니다.</Wrapper>;
  }

  return (
    <Wrapper>
      <CrewDetailInfo crew={crew}>
        <Button onClick={messageModal.handleOpenModal}>가입 신청</Button>
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
              <Button color="accent" onClick={handleFinalSubmit} type="submit">
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
