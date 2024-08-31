'use client';

import React, { useState } from 'react';
import Avatar from './Avatar';

interface ImageUploadProps {
  onImageChange: (file?: File) => void;
  error?: string; // 에러 메시지 프롭스
}

const ImageUpload = ({ onImageChange, error }: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
      // 시간 있을 때 프리뷰 구현
    } else {
      onImageChange(undefined);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={`file-input file-input-bordered file-input-primary w-full max-w-xs ${error && 'file-input-error'}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
    // 시간 있을 때 프리뷰 구현
  );
};

export default ImageUpload;
