import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface MediaUploadProps {
  onUpload: (file: File) => void;
}

export function MediaUpload({ onUpload }: MediaUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) onUpload(file);
    },
    [onUpload]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleChange}
        accept="image/*,video/*"
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700">
          Drag and drop or click to upload
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supports images and videos
        </p>
      </label>
    </div>
  );
}