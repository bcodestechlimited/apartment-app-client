import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import {
  FileTextIcon,
  ImageIcon,
  XIcon,
  Loader2,
  UploadIcon,
} from "lucide-react";
import { uploadFileToCloudinary } from "@/lib/upload";

// Define an interface to keep track of the file name alongside its URL
export interface FileValue {
  url: string;
  name: string;
}

interface FileInputProps {
  className?: string;
  multiple?: boolean;
  numberOfFiles?: number;
  maxSize?: number;
  onFilesChange?: (files: FileValue[]) => void;
  accept?: string;
  value?: FileValue[];
  errorMessage?: string | undefined;
  customMessage?: string;
}

const FileInput = ({
  className,
  maxSize = 10 * 1024 * 1024,
  onFilesChange,
  value = [],
  errorMessage,
  numberOfFiles = 1,
  customMessage,
  ...props
}: FileInputProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (incomingFiles: FileList) => {
    // 1. Calculate how many more files we can actually accept
    const remainingSlots = numberOfFiles - value.length;
    if (remainingSlots <= 0) return;

    setUploading(true);
    const uploadedFileObjects: FileValue[] = [];

    try {
      const filesToUpload = Array.from(incomingFiles).slice(0, remainingSlots);

      const uploadPromises = filesToUpload.map(async (file) => {
        if (file.size <= maxSize) {
          const result = await uploadFileToCloudinary(file);
          if (result?.secure_url) {
            return {
              url: result.secure_url,
              name: file.name,
            };
          }
        }
        return null;
      });

      const results = await Promise.all(uploadPromises);

      const validResults = results.filter((r): r is FileValue => r !== null);

      if (onFilesChange && validResults.length > 0) {
        onFilesChange([...value, ...validResults]);
      }
    } catch (error) {
      console.error("Cloudinary upload failed", error);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else if (e.type === "dragleave") setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files?.length > 0) handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  return (
    <div className="space-y-1">
      <div
        className={cn(
          "relative rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "hover:border-primary/50",
          errorMessage ? "border-red-500" : "",
          uploading ? "opacity-50 cursor-not-allowed" : "",
          className,
        )}
      >
        {value.length <= 0 ? (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center space-y-2 text-center"
          >
            <div className="flex items-center justify-center rounded-full bg-gray-100 p-3">
              {uploading ? (
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              ) : (
                <UploadIcon className="h-6 w-6 text-gray-500" />
              )}
            </div>
            <div className="flex text-sm text-gray-600">
              <span className="relative cursor-pointer rounded-md font-medium text-primary">
                {uploading ? "Uploading..." : "Click to upload"}
              </span>
              {!uploading && <p className="pl-1">or drag and drop</p>}
            </div>
            {customMessage && (
              <p className="text-xs text-gray-500">{customMessage}</p>
            )}
            <p className="text-xs text-gray-500">
              Max size: {maxSize / (1024 * 1024)}MB
            </p>
            <Input
              ref={inputRef}
              {...props}
              type="file"
              disabled={uploading}
              onChange={handleChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              multiple={numberOfFiles > 1}
            />
          </div>
        ) : (
          <ul className="flex flex-col space-y-2">
            {value.map((fileObj, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between space-x-2"
              >
                <div className="flex items-center gap-1">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary truncate max-w-[200px]">
                    {fileObj.name} {/* This now displays the real name */}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => {
                    const updated = value.filter((_, i) => i !== idx);
                    if (onFilesChange) onFilesChange(updated);
                  }}
                  className="text-destructive hover:underline cursor-pointer"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </li>
            ))}
            {uploading && (
              <li className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
                <Loader2 className="h-3 w-3 animate-spin" /> Uploading more...
              </li>
            )}
          </ul>
        )}
      </div>
      {errorMessage && (
        <p className="text-destructive text-sm mt-1 text-end">{errorMessage}</p>
      )}
    </div>
  );
};

export { FileInput };
