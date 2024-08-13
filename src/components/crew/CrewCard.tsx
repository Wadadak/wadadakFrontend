'use client';

import React, { useState } from 'react';
import SimpleModal from '../common/SimpleModal';
import { RegularRunningInfo } from '@/types/crewTypes';

interface CrewCardProps {
  crewName: string;
  crewOccupancy: number;
  crewCapacity: number;
  crewImage?: string;
  activityRegion: string;
  regularRunningInfo?: RegularRunningInfo[];
}

const CrewCard: React.FC<CrewCardProps> = ({
  crewName,
  crewOccupancy,
  crewCapacity,
  crewImage,
  activityRegion,
  regularRunningInfo = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const defaultImage = '/images/default.png';

  return (
    <div
      className="card bg-base-100 w-96 shadow-sm cursor-pointer focus:outline focus:outline-2  focus:outline-accent focus:outline-offset-0 hover:outline hover:outline-2 hover:outline-accent hover:outline-offset-0"
      tabIndex={0}
    >
      <figure>
        <img src={crewImage || defaultImage} alt={crewName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {crewName}
          <div className="badge badge-secondary">{activityRegion}</div>
        </h2>
        <p>
          인원 : {crewOccupancy}명 / {crewCapacity}명
        </p>
        <div className="card-actions justify-start">
          <div className="badge py-3 hover:bg-accent" onClick={handleOpenModal}>
            정기 러닝 정보
          </div>

          {isModalOpen && (
            <SimpleModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title="정기 러닝 정보"
            >
              {regularRunningInfo.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>지역</th>
                        <th>주기</th>
                        <th>요일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regularRunningInfo.map((info) => (
                        <tr key={info.id}>
                          <td>{info.location}</td>
                          <td>
                            {info.frequency.weeks}주에 {info.frequency.times}번
                          </td>
                          <td>{info.weekdays.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>정기 러닝 정보가 없습니다.</p>
              )}
            </SimpleModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
