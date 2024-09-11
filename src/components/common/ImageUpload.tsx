'use client';

import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';

interface ImageUploadProps {
  onImageChange: (file?: File) => void;
  imgUrl?: string;
  error?: string; // 에러 메시지 프롭스
}

const ImageUpload = ({ onImageChange, imgUrl, error }: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imgUrl);

  // URL로 받은 이미지가 변경될 때 미리보기 업데이트
  useEffect(() => {
    if (imgUrl) {
      setPreviewUrl(imgUrl);
    }
  }, [imgUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    if (file && file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file)); // 새 파일의 미리보기 URL 생성
      onImageChange(file);
    } else {
      setPreviewUrl(imgUrl);
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
