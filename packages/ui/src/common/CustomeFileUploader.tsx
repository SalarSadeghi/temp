import React, { useCallback } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { Shared_Text } from "../Texts/texts.js";
import { CloudUploadOutlined } from "../../../icons/src/index.js";

export enum MIMES {
  png = "image/png",
  jpg = "image/jpeg",
  pdf = "application/pdf",
  ppt = "application/vnd.ms-powerpoint",
  pptx = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt = "text/plain",
  xls = "application/vnd.ms-excel",
  xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  doc = "application/msword",
  docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  mp3 = "audio/mpeg",
  mp4 = "video/mp4",
  mpeg = "video/mpeg",
  ogv = "video/ogg",
  webm = "video/webm",
  avi = "video/x-msvideo",
}

enum FILE_ERROR_CODES {}

interface FileUploaderProps {
  onFilesAccepted: (files: File[]) => void;
  onFilesRejected?: (rejections: FileRejection[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: Record<MIMES | string, string[]>;
  acceptText?: string[];
  multiple?: boolean;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const CustomeFileUploader: React.FC<FileUploaderProps> = ({
  onFilesAccepted,
  onFilesRejected,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = {
    "image/jpeg": [],
    "image/png": [],
    "application/pdf": [],
    "application/vnd.ms-excel": [],
  },
  acceptText = ["jpeg", "png", "pdf", "excel"],
  multiple = true,
  disabled = false,
  title = Shared_Text.common.uploadFile.attachFileHintTitle,
  subtitle = "",
  className = "",
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      onFilesAccepted(acceptedFiles);
      if (rejectedFiles.length > 0 && onFilesRejected) {
        onFilesRejected(rejectedFiles);
      }
    },
    [onFilesAccepted, onFilesRejected]
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    maxFiles,
    maxSize,
    accept,
    multiple,
    disabled,
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections,
    acceptedFiles,
  } = useDropzone(dropzoneOptions);

  // Determine border color based on state
  const getBorderColor = () => {
    // if (isDragReject) return "border-red-500";
    // if (isDragAccept) return "border-green-500";
    if (acceptedFiles?.length > 0) return "border-blue-500";
    return "border-red-300";
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  console.log(getBorderColor());

  return (
    <div className={`w-full ${className}`}>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center gap-1 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors duration-200 ease-in-out border-blue-500
        
        
        `}
      >
        <input {...getInputProps()} />

        {/* Upload Icon */}
        {/* <svg
          className="w-12 h-12 mx-auto mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg> */}
        <CloudUploadOutlined color="info" sx={{ fontSize: 40 }} />

        {/* Title */}
        <p className="text-medium font-medium text-gray-700">{title}</p>

        {/* Subtitle */}
        <p className="text-sm text-gray-500">{subtitle}</p>

        {/* File limits info */}
        <div className="flex flex-col gap-1 text-xs break text-gray-400">
          {/* {multiple && `Max ${maxFiles} files • `} */}
          <span>
            {Shared_Text.common.uploadFile.attchFileHintSize}
            {": "}
            <span dir="ltr" className="font-semibold">
              {formatFileSize(maxSize)}
            </span>
          </span>
          {acceptText && (
            <span>
              {Shared_Text.common.uploadFile.attachFileHintType}
              {": "}
              <span className="font-semibold">{acceptText.join(", ")}</span>
            </span>
          )}
        </div>
      </div>

      {/* File rejection errors */}
      {/* {fileRejections.length > 0 && (
        <div className="mt-3 space-y-1">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="text-sm text-red-600">
              <span className="font-medium">{file.name}</span>
              {errors.map((e) => (
                <p key={e.code} className="text-xs">
                  {e.code === "file-too-large"
                    ? `File is larger than ${formatFileSize(maxSize)}`
                    : e.code === "file-invalid-type"
                      ? "File type not supported"
                      : e.message}
                </p>
              ))}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};
