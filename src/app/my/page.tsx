'use client';

import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import NumberInput from '@/components/common/NumberInput';
import SimpleModal from '@/components/common/SimpleModal';
import TextInput from '@/components/common/TextInput';
import { ToggleButton } from '@/components/common/ToggleButtion';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import {
  faPen,
  faPenToSquare,
  faRankingStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyPage = () => {
  const router = useRouter();
  const [tabSelect, setTabSelect] = useState(false);
  const [isRunningProfileOn, setIsRunningProfileOn] = useState<boolean>(false);
  const [isRunningRecordProfileOn, setIsRunningRecordProfileOn] =
    useState<boolean>(false);

  const [recordTab, setRecordTab] = useState('round'); // round, week, month, year
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      <TitleBanner>
        <div className="py-16">🏃🏻내 정보</div>
      </TitleBanner>
      {/* 총 거리 */}
      <Wrapper>
        <div className="flex flex-col w-full">
          <div className="flex justify-end items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Avatar size="w-8" />
              <div className="font-bold">닉네임</div>
            </div>
            <Button
              onClick={() => {
                router.push('/my/edit');
              }}
            >
              프로필 수정
            </Button>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col items-center space-y-1">
              <div className="text-[128px] font-extrabold">2453.3</div>
              <div className="font-bold">총 거리</div>
            </div>
            <div className="flex justify-center mt-8 space-x-16">
              <MyRecordItem record={'128'} name={'총 러닝 횟수'} />
              <MyRecordItem record={"5'32''"} name={'평균 페이스'} />
              <MyRecordItem record={'164'} name={'평균 칼로리'} />
            </div>
            <button className="text-[14px] text-gray-400 underline underline-offset-4">
              기록 추가하기
            </button>
          </div>
        </div>
      </Wrapper>
      <div className="w-full h-2 bg-gray-200"></div>
      {/* 주,월,연 목표 */}
      <Wrapper>
        <div className="flex flex-col space-y-16">
          <div className="flex flex-col space-y-7">
            <div className="flex justify-center">
              <div
                role="tablist"
                className="tabs tabs-bordered w-60 space-x-8 font-bold"
              >
                <a
                  role="tab"
                  className="tab text-gray-500"
                  style={{ whiteSpace: 'nowrap' }}
                  onClick={() => {
                    setTabSelect(true);
                  }}
                >
                  내 러닝
                </a>
                <a
                  role="tab"
                  className="tab text-gray-500 tab-active"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  내 크루
                </a>
                <a
                  role="tab"
                  className="tab text-gray-500"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  내 활동
                </a>
              </div>
            </div>

            <div className="flex flex-col space-y-12 w-full">
              <div className="flex justify-end space-x-3">
                <div className="font-bold">프로필 공개</div>
                <ToggleButton
                  onButtonClick={() =>
                    setIsRunningProfileOn(!isRunningProfileOn)
                  }
                  isOn={isRunningProfileOn}
                />
              </div>

              <div className="flex justify-center grid-cols-3 gap-[100px]">
                <MyGoalItem title={'주간 목표'} onItemClick={() => {}} />
                <MyGoalItem title={'월간 목표'} onItemClick={() => {}} />
                <MyGoalItem title={'연간 목표'} onItemClick={() => {}} />
              </div>
            </div>
          </div>
          {/* 기록 코드 리스트 */}
          <div className="flex flex-col space-y-7">
            <div className="flex justify-between items-center">
              <div className="flex space-x-5 justify-center flex-grow">
                <Button
                  color={recordTab === 'round' ? 'accent' : undefined}
                  onClick={() => {
                    setRecordTab('round');
                  }}
                >
                  회차별
                </Button>
                <Button
                  color={recordTab === 'week' ? 'accent' : undefined}
                  onClick={() => {
                    setRecordTab('week');
                  }}
                >
                  주별
                </Button>
                <Button
                  color={recordTab === 'month' ? 'accent' : undefined}
                  onClick={() => {
                    setRecordTab('month');
                  }}
                >
                  월별
                </Button>
                <Button
                  color={recordTab === 'year' ? 'accent' : undefined}
                  onClick={() => {
                    setRecordTab('year');
                  }}
                >
                  연간
                </Button>
              </div>
              <div className="flex space-x-3 items-center">
                <div className="font-bold">프로필 공개</div>
                <ToggleButton
                  onButtonClick={() =>
                    setIsRunningRecordProfileOn(!isRunningRecordProfileOn)
                  }
                  isOn={isRunningRecordProfileOn}
                />
              </div>
            </div>
            <div className="w-full h-1 bg-gray-100"></div>
            {recordTab === 'round' && (
              <div className="flex flex-col space-y-4">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                  <RunningRecordItem
                    key={index}
                    round={index + 1}
                    date={'2024-05-16'}
                    distance={11.83}
                    totalTime={'01:12:25'}
                    pace={"5'55''"}
                    onButtonClick={() => {
                      setShowEditModal(true);
                    }}
                  />
                ))}
              </div>
            )}
            {recordTab === 'week' && (
              <div className="flex flex-col space-y-4">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                  <RunningRecordItem
                    key={index}
                    date={'2024-05-1주차'}
                    distance={11.83}
                    totalTime={'01:12:25'}
                    pace={"5'55''"}
                  />
                ))}
              </div>
            )}
            {recordTab === 'month' && (
              <div className="flex flex-col space-y-4">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                  <RunningRecordItem
                    key={index}
                    date={'2024-05월'}
                    distance={11.83}
                    totalTime={'01:12:25'}
                    pace={"5'55''"}
                  />
                ))}
              </div>
            )}
            {recordTab === 'year' && (
              <div className="flex flex-col space-y-4">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                  <RunningRecordItem
                    key={index}
                    date={'2024년'}
                    distance={11.83}
                    totalTime={'01:12:25'}
                    pace={"5'55''"}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-center">
              <Button
                wide
                onClick={() => {
                  setShowAddRecord(true);
                }}
              >
                <FontAwesomeIcon icon={faPen} />
                <span>기록 추가</span>
              </Button>
            </div>
          </div>
        </div>
      </Wrapper>
      <EditRecordModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
        }}
        _date={'2024-05-06'}
        _distance={'11.2'}
        _record={'1:23:33'}
        _pace={"5'44''"}
      />
      <AddRecordModal
        isOpen={showAddRecord}
        onClose={() => setShowAddRecord(false)}
      />
      <SimpleModal isOpen={false} onClose={() => {}} title={'주간 목표'}>
        <div>hihi</div>
      </SimpleModal>
    </div>
  );
};
export default MyPage;

interface MyGoalItemProps {
  title: string;
  onItemClick: () => void;
}
const MyGoalItem = ({ title, onItemClick }: MyGoalItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center space-y-3">
        <div
          className="radial-progress w-32 h-32"
          style={{ '--value': 80 }}
          role="progressbar"
        >
          80%
        </div>
        <div className="h-6 bg-gray-200 w-[200px] rounded-[12px]"></div>
        <div className="h-6 bg-gray-200 w-[200px] rounded-[12px]"></div>
      </div>
      <div
        className="flex justify-center mt-6 items-center space-x-2 cursor-pointer"
        onClick={onItemClick}
      >
        <div className="text-[16px] font-semibold">{title}</div>
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
    </div>
  );
};

interface MyRecordItemProps {
  record: string;
  name: string;
}

const MyRecordItem = ({ record, name }: MyRecordItemProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <FontAwesomeIcon icon={faRankingStar} className="w-8 h-8" />
      <div className="text-4xl font-extrabold">{record}</div>
      <div className="font-bold text-gray-500">{name}</div>
    </div>
  );
};

interface RunningRecordItemProps {
  round?: number;
  date: string;
  distance: number;
  totalTime: string;
  pace: string;
  onButtonClick?: () => void;
}
const RunningRecordItem = ({
  round,
  date,
  distance,
  totalTime,
  pace,
  onButtonClick,
}: RunningRecordItemProps) => {
  return (
    <div className="flex items-center px-5 py-4 border border-gray-200  rounded-lg">
      <div className="flex space-x-5 text-[20px] font-bold divide-x divide-gray-300 grow">
        {round && <div className="w-[100px] text-center">#{round}</div>}
        <div className="px-8">{date}</div>
        <div className="px-8">{distance}km</div>
        <div className="px-8">{totalTime}</div>
        <div className="px-8">{pace}</div>
      </div>
      {onButtonClick && <Button onClick={onButtonClick}>수정하기</Button>}
    </div>
  );
};

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddRecordModal = ({ isOpen, onClose }: AddRecordModalProps) => {
  const [date, setDate] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [record, setRecord] = useState<string>('');
  const [pace, setPace] = useState<string>('');

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title={'기록 추가'}>
      <div className="flex flex-col space-y-7">
        <div className="flex flex-col space-y-3 mt-3">
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">날짜</div>
            <TextInput
              placeholder="날짜 입력"
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">거리</div>
            <TextInput
              placeholder="거리 입력"
              value={distance}
              onChange={(value) => {
                setDistance(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">시간</div>
            <TextInput
              placeholder="시간 입력"
              value={record}
              onChange={(value) => {
                setRecord(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">페이스</div>
            <TextInput
              placeholder="페이스 입력"
              value={pace}
              onChange={(value) => {
                setPace(value);
              }}
              width="xl"
            />
          </div>
        </div>
        <Button
          onClick={() => {
            const query = {
              date,
              distance,
              record,
              pace,
            };

            console.log('query', query);

            onClose();
          }}
        >
          추가하기
        </Button>
      </div>
    </SimpleModal>
  );
};

interface EditRecordModalProps {
  _date: string;
  _distance: string;
  _record: string;
  _pace: string;
  isOpen: boolean;
  onClose: () => void;
}
const EditRecordModal = ({
  _date,
  _distance,
  _record,
  _pace,
  isOpen,
  onClose,
}: EditRecordModalProps) => {
  const [date, setDate] = useState<string>(_date);
  const [distance, setDistance] = useState<string>(_distance);
  const [record, setRecord] = useState<string>(_record);
  const [pace, setPace] = useState<string>(_pace);

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title={'기록 수정'}>
      <div className="flex flex-col space-y-7">
        <div className="flex flex-col space-y-3 mt-3">
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">날짜</div>
            <TextInput
              placeholder="날짜 입력"
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">거리</div>
            <TextInput
              placeholder="거리 입력"
              value={distance}
              onChange={(value) => {
                setDistance(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">시간</div>
            <TextInput
              placeholder="시간 입력"
              value={record}
              onChange={(value) => {
                setRecord(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">페이스</div>
            <TextInput
              placeholder="페이스 입력"
              value={pace}
              onChange={(value) => {
                setPace(value);
              }}
              width="xl"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <Button color="base-500">삭제하기</Button>
          <Button
            onClick={() => {
              const query = {
                date,
                distance,
                record,
                pace,
              };

              console.log('query', query);

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
