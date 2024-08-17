'use client';

import React, { useState } from 'react';
import Avatar from './Avatar';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
}

const ImageUpload = ({ onImageChange }: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
      // 시간 있을 때 프리뷰 구현
    } else {
      onImageChange(null);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="file-input file-input-bordered file-input-primary w-full max-w-xs"
    />

    // 시간 있을 때 프리뷰 구현
  );
};

export default ImageUpload;
