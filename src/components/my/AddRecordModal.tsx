import { useState } from 'react';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import TextInput from '../common/TextInput';
import DateOnlyPicker from '../common/DateOnlyPicker';
import Label from '../common/Label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';
import NumberInput from '../common/NumberInput';
import { useAddRunningRecord } from '@/hooks/running/useAddRunningRecord';
import { RunningRecordRequest } from '@/types/runningTypes';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
export const AddRecordModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AddRecordModalProps) => {
  const [date, setDate] = useState<string>();
  const [distance, setDistance] = useState<string>();
  const [record, setRecord] = useState<string>();
  const [paceMinute, setPaceMinute] = useState<number>();
  const [paceSecond, setPaceSecond] = useState<number>();

  const [clickDatePicker, setClickDatePicker] = useState<boolean>(false);

  const { mutate: addRecord } = useAddRunningRecord(
    () => {
      alert('기록이 추가되었습니다.');
      onClose();
    },
    (message) => {
      alert(message);
    },
  );

  const handleSubmitRecord = () => {
    if (!distance || !record || !paceMinute || !paceSecond || !date) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    const body: RunningRecordRequest = {
      runningDate: date,
      distance: Number(distance),
      runningTime: record,
      pace: `${paceMinute}'${paceSecond}"`,
    };

    console.log('body', body);
    addRecord(body);
  };

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title={'기록 추가'}>
      <div className="flex flex-col">
        <Label label={'날짜'} textSize="md" textStyle="font-semibold">
          <div
            className="relative"
            onClick={() => setClickDatePicker((prev) => !prev)}
          >
            <TextInput
              placeholder="날짜 입력"
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              width="lg"
            />
            {clickDatePicker && (
              <div className="absolute left-[32px] top-[52px]">
                <DatePicker
                  selected={undefined}
                  onChange={(date) => {
                    const dateTime =
                      date && DateTime.fromJSDate(new Date(date));
                    const formattedDate = dateTime?.toFormat('yyyy-MM-dd');
                    setDate(formattedDate);
                    setClickDatePicker(false);
                  }}
                  dateFormat="yyyy-MM-dd"
                  open={clickDatePicker} // 드롭다운 상태
                />
              </div>
            )}
          </div>
        </Label>
        <Label label={'거리'} textSize="md" textStyle="font-semibold">
          <TextInput
            placeholder="거리 입력"
            value={distance}
            onChange={(value) => {
              setDistance(value);
            }}
            width="lg"
          />
        </Label>
        <Label label={'시간'} textSize="md" textStyle="font-semibold">
          <TextInput
            placeholder="시간 입력"
            value={record}
            onChange={(value) => {
              setRecord(value);
            }}
            width="lg"
          />
        </Label>
        <Label label={'페이스'} textSize="md" textStyle="font-semibold">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <NumberInput
                placeholder="분"
                value={paceMinute}
                onChange={setPaceMinute}
                width="lg"
              />
              <div>분</div>
            </div>
            <div className="flex items-center space-x-2">
              <NumberInput
                placeholder="초"
                value={paceSecond}
                onChange={setPaceSecond}
                width="lg"
              />
              <div>초</div>
            </div>
          </div>
        </Label>
      </div>
      <div className="flex justify-end mt-3">
        <Button onClick={handleSubmitRecord}>추가하기</Button>
      </div>
    </SimpleModal>
  );
};
