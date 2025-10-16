import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, FileIcon, X } from "lucide-react";

const formSchema = z.object({
  documents: z
    .any()
    .refine(
      (files) => files && files.length > 0,
      "Please upload at least one document"
    ),
});

export default function Documents() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documents: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);
    form.setValue("documents", files, { shouldValidate: true });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    form.setValue("documents", files, { shouldValidate: true });
  };

  const handleRemoveFile = (fileName: string) => {
    const filtered = selectedFiles.filter((f) => f.name !== fileName);
    setSelectedFiles(filtered);
    form.setValue("documents", filtered, { shouldValidate: true });
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Uploaded documents:", data.documents);
  };

  return (
    <div className="max-w-2xl mr-auto space-y-6 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* Document Upload */}
          <FormField
            control={form.control}
            name="documents"
            render={() => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Upload Documents
                </FormLabel>

                {/* Drag-and-Drop Area */}
                <FormControl>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={cn(
                      "border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 p-8 text-center transition-all",
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25"
                    )}
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                      Drag & drop your files here, or{" "}
                      <label
                        htmlFor="fileUpload"
                        className="text-primary font-medium cursor-pointer"
                      >
                        browse
                      </label>
                    </p>
                    <input
                      id="fileUpload"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </FormControl>

                {/* Preview of Selected Files */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {selectedFiles.map((file) => (
                      <div
                        key={file.name}
                        className="flex items-center justify-between border rounded-full px-4 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <FileIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {file.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(file.name)}
                          className="text-muted-foreground hover:text-red-500 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <Button type="submit" className="btn-primary rounded-full px-12">
              Save Documents
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
