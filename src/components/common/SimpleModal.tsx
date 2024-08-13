// 단순 정보 표시 모달
import React from 'react';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <dialog className="modal modal-bottom sm:modal-middle" open>
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4">{children}</div>
        </div>
      </dialog>
    </div>
  );
};

export default SimpleModal;
