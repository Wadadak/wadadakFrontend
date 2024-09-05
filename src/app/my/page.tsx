'use client';

import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import SimpleModal from '@/components/common/SimpleModal';
import TextInput from '@/components/common/TextInput';
import { ToggleButton } from '@/components/common/ToggleButtion';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import { AddGoalModal } from '@/components/my/AddGoalModal';
import { AddRecordModal } from '@/components/my/AddRecordModal';
import { EditRecordModal } from '@/components/my/EditRecordModal';
import { useRunningGoal } from '@/hooks/running/useRunningGoal';
import { useRunningList } from '@/hooks/running/useRunningList';
import { useTotalRunningRecord } from '@/hooks/running/useTotalRunningRecord';
import useModal from '@/hooks/useModal';
import { useLoginUser } from '@/hooks/user/useLoginUser';
import {
  mockMyRunningInfo,
  mockRunningList,
} from '@/mocks/mockData/mockRunList';
import { MyRunningGoalItem, MyRunningGoalResponse } from '@/types/runningTypes';
import { secondsToTime } from '@/utilities';
import {
  faPen,
  faPenToSquare,
  faPersonRunning,
  faRankingStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyPage = () => {
  const { loginUser } = useLoginUser();
  const router = useRouter();
  const [tabSelect, setTabSelect] = useState(false);
  const [isRunningProfileOn, setIsRunningProfileOn] = useState<boolean>(false);
  const [isRunningRecordProfileOn, setIsRunningRecordProfileOn] =
    useState<boolean>(false);

  const [recordTab, setRecordTab] = useState('round'); // round, week, month, year
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [showAddRecord, setShowAddRecord] = useState(false);
  const [showWeeklyGoal, setShowWeeklyGoal] = useState(false);

  const addGoalModal = useModal();
  const addRecordModal = useModal();
  const editRecordModal = useModal();

  const [distance, setDistance] = useState<string>();
  const [time, setTime] = useState<string>();
  const [pace, setPace] = useState<string>();

  const [editRunningId, setEditRunningId] = useState<number | undefined>();

  const { data: runningList } = useRunningList();
  const { data: totalRunningRecord } = useTotalRunningRecord();
  const { data: runningGoal } = useRunningGoal();

  useEffect(() => {
    if (editRunningId !== undefined) {
      editRecordModal.handleOpenModal();
    }
  }, [editRunningId]);

  useEffect(() => {
    console.log('loginUser', loginUser);
  }, [loginUser]);

  useEffect(() => {
    console.log('runningGoal', runningGoal);
  }, [runningGoal]);

  // if (!loginUser) {
  //   return (
  //     <div className="h-[60vh] flex justify-center items-center">
  //       잘못된 접근입니다
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-center w-full">
      <TitleBanner>🏃🏻내 러닝</TitleBanner>
      {/* 총 거리 */}
      <Wrapper>
        <div className="flex flex-col w-full">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-end space-x-3">
              <div className="font-bold">프로필 공개</div>
              <ToggleButton
                onButtonClick={() => setIsRunningProfileOn(!isRunningProfileOn)}
                isOn={isRunningProfileOn}
              />
            </div>
            {/* <div className="flex flex-col items-center space-y-1">
              <div className="text-[128px] font-extrabold">
                {totalRunningRecord?.distance ?? 123.4} km
              </div>
              <div className="font-bold">총 거리</div>
            </div>
            <div className="flex justify-center mt-8 space-x-16">
              <MyRecordItem
                record={String(totalRunningRecord?.runningTime ?? '123')}
                name={'총 러닝 횟수'}
              />
              <MyRecordItem
                record={totalRunningRecord?.pace ?? '12\'34"'}
                name={'평균 페이스'}
              />
              <MyRecordItem
                record={String(totalRunningRecord?.distance ?? '123.4')}
                name={'총 거리 **'}
              />
            </div> */}
            <div className="flex items-center justify-center w-full py-16">
              <div className="flex flex-col space-y-4">
                <div className="font-semibold text-[20px]">
                  나의 누적 기록이 없습니다.
                </div>
                <button className="btn" onClick={addGoalModal.handleOpenModal}>
                  등록하기
                </button>
              </div>
            </div>
            <button
              className="text-[14px] text-gray-400 underline underline-offset-4"
              onClick={addRecordModal.handleOpenModal}
            >
              기록 추가하기
            </button>
          </div>
        </div>
      </Wrapper>
      <div className="w-full h-2 bg-gray-200"></div>
      {/* 주,월,연 목표 */}
      <Wrapper>
        <div className="flex flex-col space-y-16">
          <div className="flex flex-col">
            {runningGoal?.[0]?.createdAt ? (
              <div className="flex flex-col w-full">
                <MyGoalItem
                  title={'월간 목표'}
                  progress={40}
                  onItemClick={addGoalModal.handleOpenModal}
                  runningGoal={runningGoal?.[0]}
                />
                <div className="flex justify-end mt-8 space-x-3">
                  <div className="font-bold">프로필 공개</div>
                  <ToggleButton
                    onButtonClick={() =>
                      setIsRunningProfileOn(!isRunningProfileOn)
                    }
                    isOn={runningGoal?.[0]?.isPublic === 1}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full py-16">
                <div className="flex flex-col space-y-4">
                  <div className="font-semibold text-[20px]">
                    나의 월간 목표가 없습니다.
                  </div>
                  <button
                    className="btn"
                    onClick={addGoalModal.handleOpenModal}
                  >
                    등록하기
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* 기록 코드 리스트 */}
          <div className="flex flex-col space-y-7">
            <div className="flex items-center justify-between">
              <div className="flex justify-center flex-grow space-x-5">
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
              {/* <div className="flex items-center space-x-3">
                <div className="font-bold">프로필 공개</div>
                <ToggleButton
                  onButtonClick={() =>
                    setIsRunningRecordProfileOn(!isRunningRecordProfileOn)
                  }
                  isOn={isRunningRecordProfileOn}
                />
              </div> */}
            </div>
            <div className="w-full h-1 bg-gray-100"></div>
            {/* {recordTab === 'round' && (
              <>
                {mockRunningList.data.map((item, index) => (
                  <RunningRecordItem
                    key={index}
                    round={item.runRecordId}
                    date={item.runningDate ?? ''}
                    distance={item.distance}
                    totalTime={item.runningTime}
                    pace={item.pace}
                    onButtonClick={() => {
                      setEditRunningId(item.runRecordId);
                    }}
                  />
                ))}
              </>
            )} */}
            {recordTab === 'round' &&
              (runningList?.data && runningList?.data?.length > 0 ? (
                <div className="flex flex-col space-y-4">
                  {runningList?.data.map((item, index) => (
                    <RunningRecordItem
                      key={index}
                      round={item.runRecordId}
                      date={item.runningDate ?? ''}
                      distance={item.distance}
                      totalTime={item.runningTime}
                      pace={item.pace}
                      onButtonClick={() => {
                        setEditRunningId(item.runRecordId);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full py-10 text-center">
                  데이터가 없습니다.
                </div>
              ))}
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
                  addRecordModal.handleOpenModal();
                }}
              >
                <FontAwesomeIcon icon={faPen} />
                <span>기록 추가</span>
              </Button>
            </div>
          </div>
        </div>
      </Wrapper>
      {addGoalModal.isModalOpen && (
        <AddGoalModal
          isOpen={addGoalModal.isModalOpen}
          onClose={addGoalModal.handleCloseModal}
          onSuccess={router.refresh}
        />
      )}
      {editRecordModal.isModalOpen && (
        <EditRecordModal
          id={editRunningId}
          isOpen={editRecordModal.isModalOpen}
          onClose={editRecordModal.handleCloseModal}
        />
      )}
      {addRecordModal.isModalOpen && (
        <AddRecordModal
          goalId={runningGoal?.[0]?.id ?? 0}
          isOpen={addRecordModal.isModalOpen}
          onClose={addRecordModal.handleCloseModal}
          onSuccess={() => {
            //hctodo
            //기록 리스트 다시 불러오기
          }}
        />
      )}
      <SimpleModal
        isOpen={showWeeklyGoal}
        onClose={() => {
          setShowWeeklyGoal(false);
        }}
        title={'주간 목표'}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-5">
            <div>2024.08.05 ~ 07일</div>
            <div className="flex flex-col space-y-2">
              <div className="font-bold">거리</div>
              <TextInput
                value={distance}
                onChange={(value) => {
                  setDistance(value);
                }}
                placeholder="목표 거리 입력"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="font-bold">시간</div>
              <TextInput
                value={time}
                onChange={(value) => {
                  setTime(value);
                }}
                placeholder="목표 시간 입력"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="font-bold">페이스</div>
              <TextInput
                value={pace}
                onChange={(value) => {
                  setPace(value);
                }}
                placeholder="목표 페이스 입력"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>설정 하기</Button>
          </div>
        </div>
      </SimpleModal>
    </div>
  );
};
export default MyPage;

interface MyGoalItemProps {
  title: string;
  progress: number;
  runningGoal?: MyRunningGoalItem;
  onItemClick: () => void;
}

const MyGoalItem = ({
  title,
  onItemClick,
  progress,
  runningGoal,
}: MyGoalItemProps) => {
  console.log('runningGoal', runningGoal);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center space-y-3">
        {/* 월간 목표 수정하기 */}
        <div
          className="flex items-center justify-center mt-6 space-x-2 cursor-pointer"
          onClick={onItemClick}
        >
          <div className="text-[24px] font-bold">나의 월간 목표</div>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <div className="flex items-center pt-8 space-x-7">
          <MyGoalInnerItem
            record={
              runningGoal?.totalDistance
                ? `${String(runningGoal?.totalDistance)}km`
                : '없음'
            }
            name={'목표 누적거리'}
          />
          <MyGoalInnerItem
            record={
              runningGoal?.runCount
                ? `${String(runningGoal?.runCount)}회`
                : '없음'
            }
            name={'목표 누적횟수'}
          />
          <MyGoalInnerItem
            record={String(
              runningGoal?.totalRunningTime
                ? secondsToTime(runningGoal?.totalRunningTime)
                : '없음',
            )}
            name={'목표 러닝시간'}
          />
          <MyGoalInnerItem
            record={
              runningGoal?.averagePace
                ? secondsToTime(Number(runningGoal?.averagePace)).replace(
                    '00h',
                    '',
                  )
                : '없음'
            }
            name={'목표 평균페이스'}
          />
        </div>
      </div>
    </div>
  );
};

const MyGoalItemCircle = ({
  title,
  onItemClick,
  progress,
  runningGoal,
}: MyGoalItemProps) => {
  const style: React.CSSProperties = {
    '--value': progress,
    '--size': '8rem',
    '--thickness': '1rem',
  } as React.CSSProperties;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center space-y-3">
        <div className="radial-progress" style={style} role="progressbar">
          {progress}%
        </div>
        <div className="h-6 bg-gray-200 w-[200px] rounded-[12px]"></div>
        <div className="h-6 bg-gray-200 w-[200px] rounded-[12px]"></div>
      </div>
      <div
        className="flex items-center justify-center mt-6 space-x-2 cursor-pointer"
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
  iconStyle?: string;
  recordStyle?: string;
  nameStyle?: string;
}

export const MyRecordItem = ({
  record,
  name,
  iconStyle,
  recordStyle,
  nameStyle,
}: MyRecordItemProps) => {
  return (
    <div className="w-[140px] flex flex-col items-center space-y-2">
      <FontAwesomeIcon
        icon={faRankingStar}
        className={`w-8 h-8 ${iconStyle}`}
      />
      <div className={`text-4xl font-extrabold ${recordStyle}`}>{record}</div>
      <div className={`font-bold text-gray-500 ${nameStyle}`}>{name}</div>
    </div>
  );
};

export const MyGoalInnerItem = ({
  record,
  name,
  iconStyle,
  recordStyle,
  nameStyle,
}: MyRecordItemProps) => {
  return (
    <div className="w-[240px] flex flex-col items-center space-y-2">
      <FontAwesomeIcon icon={faPersonRunning} className="w-8 h-8" />
      <div className={`text-4xl text-gray-300 font-extrabold ${recordStyle}`}>
        {record}
      </div>
      <div className={`font-bold text-gray-500 ${nameStyle}`}>{name}</div>
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
    <div className="flex items-center px-5 py-4 border border-gray-200 rounded-lg">
      <div className="flex text-[20px] font-bold divide-x divide-gray-300 grow">
        {round && <div className="w-[80px] text-center">#{round}</div>}
        <div className="w-[180px] text-center">{date}</div>
        <div className="w-[180px] text-center">{distance}km</div>
        <div className="w-[180px] text-center">{totalTime}</div>
        <div className="w-[180px] text-center">{pace}</div>
      </div>
      {onButtonClick && <Button onClick={onButtonClick}>수정하기</Button>}
    </div>
  );
};

