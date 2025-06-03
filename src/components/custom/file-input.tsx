import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";

interface FileInputProps {
  className?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  value?: File[];
}

const FileInput = ({
  className,
  maxSize = 10 * 1024 * 1024,
  onFilesChange,
  value,
  ...props
}: FileInputProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>(value || []);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log({ files: e.target.files });

    if (e.target.files && e.target.files.length > 2) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (newFiles: FileList) => {
    const validFiles: File[] = [];

    for (let i = 0; i < newFiles.length; i++) {
      if (newFiles[i].size <= maxSize) {
        validFiles.push(newFiles[i]);
      }
    }

    if (onFilesChange) onFilesChange([...files, ...validFiles]);

    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...validFiles];
      // const updatedFiles = [...validFiles];
      return updatedFiles;
    });

    // setFiles((prev) => {
    //   const updatedFiles = props.multiple
    //     ? [...prev, ...validFiles]
    //     : validFiles.slice(0, 1);
    //   if (onFilesChange) onFilesChange(updatedFiles);
    //   return updatedFiles;
    // });
  };

  // const triggerFileInput = () => {
  //   console.log("Clicked");

  //   console.log(inputRef);
  //   // console.log(inputRef.current);

  //   // if (inputRef.current) {
  //   //   inputRef.current.click();
  //   // }
  // };

  return (
    <div className="space-y-1">
      <div
        className={cn(
          "relative rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "hover:border-primary/50",
          className
        )}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        // onClick={triggerFileInput}
      >
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex items-center justify-center rounded-full bg-gray-100 p-3">
            <UploadIcon className="h-6 w-6 text-gray-500" />
          </div>
          <div className="flex text-sm text-gray-600">
            <span className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
              Click to upload
            </span>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            {props.accept ? props.accept : "Any file type"} up to{" "}
            {maxSize / (1024 * 1024)}MB
          </p>
        </div>
        <Input
          ref={inputRef}
          {...props}
          type="file"
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          multiple
        />
      </div>
      {files.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {files.length} file(s) selected
        </p>
      )}
    </div>
  );
};
FileInput.displayName = "FileInput";

const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

export { FileInput };

export type { FileInputProps };

export { UploadIcon };
