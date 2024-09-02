import { mockRunningList } from '@/mocks/mockData/mockRunList';
import { useState, useEffect, use } from 'react';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import TextInput from '../common/TextInput';
import { useRunningRecord } from '@/hooks/running/useRunningRecord';
import LoadingSpinner from '../common/LoadingSpinner';

interface EditRecordModalProps {
  id?: number;
  isOpen: boolean;
  onClose: () => void;
}
export const EditRecordModal = ({
  id,
  isOpen,
  onClose,
}: EditRecordModalProps) => {
  if (id === undefined) return <></>;

  const { data, isLoading } = useRunningRecord(id);

  const [date, setDate] = useState<string | undefined>(
    data?.runningRecord?.runningDate,
  );
  const [distance, setDistance] = useState<string | undefined>(
    String(data?.runningRecord?.distance),
  );
  const [record, setRecord] = useState<string | undefined>(
    data?.runningRecord?.runningTime,
  );
  const [pace, setPace] = useState<string | undefined>(
    data?.runningRecord?.pace,
  );

  useEffect(() => {
    setDate(data?.runningRecord?.runningDate);
    setDistance(String(data?.runningRecord?.distance));
    setRecord(data?.runningRecord?.runningTime);
    setPace(data?.runningRecord?.pace);
  }, [data]);

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title={'기록 수정'}>
      {/* <LoadingSpinner /> */}
      <div className="flex flex-col space-y-7">
        {isLoading ? (
          <div className="h-[334px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex flex-col mt-3 space-y-3 h-[334px]">
            <div className="flex flex-col space-y-2">
              <div className="font-semibold">날짜</div>
              <TextInput
                placeholder="날짜 입력"
                value={date}
                onChange={setDate}
                width="xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="font-semibold">거리</div>
              <TextInput
                placeholder="거리 입력"
                value={distance}
                onChange={setDistance}
                width="xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="font-semibold">시간</div>
              <TextInput
                placeholder="시간 입력"
                value={record}
                onChange={setRecord}
                width="xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="font-semibold">페이스</div>
              <TextInput
                placeholder="페이스 입력"
                value={pace}
                onChange={setPace}
                width="xl"
              />
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-3">
          <Button
            color="base-500"
            onClick={() => {
              // alert(`#${data.runRecordId}을 삭제합니다.`);
              //삭제 api를 호출
              // 성공하면 모달 닫기.
              onClose();
            }}
          >
            삭제하기
          </Button>
          <Button
            onClick={() => {
              const query = {
                date,
                distance,
                record,
                pace,
              };

              console.log('query', query);

              //query를 기록 수정하는 api에 보냄
              //isSuccess == true이면

              alert('수정되었습니다!');

              onClose();
            }}
          >
            수정하기
          </Button>
        </div>
      </div>
    </SimpleModal>
  );
};
