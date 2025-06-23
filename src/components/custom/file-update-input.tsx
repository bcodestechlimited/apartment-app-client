import { useRef, useState } from "react";
import { XIcon, ImageIcon, FileTextIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface FileUpdateInputProps {
  existingImages?: string[];
  onChange: (existingImages: string[], newFiles: File[]) => void;
  multiple?: boolean;
  maxSize?: number;
  accept?: string;
  className?: string;
}

export const FileUpdateInput = ({
  existingImages = [],
  onChange,
  multiple = true,
  maxSize = 10 * 1024 * 1024,
  accept = ".jpg,.jpeg,.png",
  className,
}: FileUpdateInputProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentImages, setCurrentImages] = useState<string[]>(existingImages);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const validFiles: File[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].size <= maxSize) {
        validFiles.push(selectedFiles[i]);
      }
    }

    const updatedFiles = [...uploadedFiles, ...validFiles];
    setUploadedFiles(updatedFiles);
    onChange(currentImages, updatedFiles);
  };

  const removeExisting = (url: string) => {
    const updated = currentImages.filter((img) => img !== url);
    setCurrentImages(updated);
    onChange(updated, uploadedFiles);
  };

  const removeNew = (file: File) => {
    const updated = uploadedFiles.filter((f) => f !== file);
    setUploadedFiles(updated);
    onChange(currentImages, updated);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* File Picker */}
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg hover:border-primary transition-colors"
      >
        <p className="text-sm text-gray-600">
          Click to upload or drag files here
        </p>
      </div>
      <Input
        type="file"
        multiple={multiple}
        accept={accept}
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Existing Images */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">Existing Images</p>
        {currentImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {currentImages.map((img, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={() => setDraggingIndex(idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggingIndex === null || draggingIndex === idx) return;
                  const updated = [...currentImages];
                  const draggedItem = updated[draggingIndex];
                  updated.splice(draggingIndex, 1);
                  updated.splice(idx, 0, draggedItem);
                  setCurrentImages(updated);
                  onChange(updated, uploadedFiles);
                  setDraggingIndex(null);
                }}
                className={cn(
                  "relative group cursor-move",
                  draggingIndex === idx && "opacity-50 ring-2 ring-primary"
                )}
              >
                <img
                  src={img}
                  alt={`property-${idx}`}
                  className="w-full h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeExisting(img)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <XIcon size={14} className="text-destructive" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Uploads */}
      <div>
        <p className="text-sm text-gray-600">New Uploads</p>
        {uploadedFiles.length > 0 && (
          <ul className="space-y-1 mt-2">
            {uploadedFiles.map((file, idx) => (
              <li key={idx} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-sm">
                  {file.type.includes("image") ? (
                    <ImageIcon size={16} className="text-primary" />
                  ) : (
                    <FileTextIcon size={16} className="text-primary" />
                  )}
                  {file.name}
                </div>
                <button
                  type="button"
                  onClick={() => removeNew(file)}
                  className="text-destructive"
                >
                  <XIcon size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
