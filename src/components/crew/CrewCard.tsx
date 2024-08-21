'use client';

import React, { useState } from 'react';
import SimpleModal from '../common/SimpleModal';
import { RegularRunningInfo } from '@/types/crewTypes';
import Link from 'next/link';
import RegularRunningInfoTable from './RegularRunningInfoTable';

interface CrewCardProps {
  crewId: number;
  crewName: string;
  crewOccupancy: number;
  crewCapacity: number;
  crewImage?: string | null;
  activityRegion: string;
  regularRunningInfo?: RegularRunningInfo[];
  myCrew?: boolean;
}

const CrewCard = ({
  crewId,
  crewName,
  crewOccupancy,
  crewCapacity,
  crewImage,
  activityRegion,
  regularRunningInfo = [],
  myCrew = false,
}: CrewCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const defaultImage = '/images/default.png';

  const handleCardClick = () => {
    if (myCrew) {
      return `/my-crews/${crewId}`;
    } else {
      return `/crew/${crewId}`;
    }
  };

  return (
    <Link href={handleCardClick()}>
      <div
        className="card bg-base-100 w-full sm:max-w-md md:max-w-lg lg:max-w-xl  shadow-sm cursor-pointer focus:outline focus:outline-2  focus:outline-accent focus:outline-offset-0 hover:outline hover:outline-2 hover:outline-accent hover:outline-offset-0"
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
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
            <div
              className="badge py-3 hover:bg-accent"
              onClick={handleOpenModal}
            >
              정기 러닝 정보
            </div>

            {isModalOpen && (
              <SimpleModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="정기 러닝 정보"
              >
                <RegularRunningInfoTable
                  regularRunningInfo={regularRunningInfo}
                />
              </SimpleModal>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CrewCard;
