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
import { Upload, X, FileText, ServerCrash, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { toast } from "sonner";
import { CustomAlert } from "@/components/custom/custom-alert";
import { uploadFileToCloudinary } from "@/lib/upload";
import ImageLightbox from "@/components/custom/image-lightbox";

const formSchema = z.object({
  document: z
    .any()
    .refine((file) => file instanceof File, "Please upload an image file"),
});

export default function Documents() {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const queryClient = useQueryClient();

  const { data, isError } = useQuery({
    queryKey: ["user-documents"],
    queryFn: () => authService.getUserDocuments(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: (payload: { document: string; name: string }) =>
      authService.updateUserDocuments(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-documents"] });
      queryClient.invalidateQueries({ queryKey: ["verification-documents"] });
      toast.success("Documents updated successfully!");
      setError(null);
      setPreview(null);
      form.reset();
    },
    onError: (error: any) => {
      setError(error.message || "Something went wrong");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    form.setValue("document", file, { shouldValidate: true });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    form.setValue("document", file, { shouldValidate: true });
  };

  const handleRemove = () => {
    setPreview(null);
    form.resetField("document");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Upload to Cloudinary
      const cloudinaryResult = await uploadFileToCloudinary(values.document);

      if (!cloudinaryResult?.secure_url) {
        throw new Error("Failed to upload image. Please try again.");
      }

      // Step 2: Submit URL and original filename to Backend
      await mutation.mutateAsync({
        document: cloudinaryResult.secure_url,
        name: values.document.name,
      });
    } catch (err: any) {
      setError(err.message || "An error occurred during submission");
    } finally {
      setIsProcessing(false);
    }
  };

  const userDocuments = data?.documents || [];
  const allDocumentUrls = userDocuments.map((doc: any) => doc.fileUrl);
  const isPendingDocument = userDocuments.some(
    (doc: any) => doc.status === "pending",
  );

  if (isError) {
    return (
      <div className="flex flex-col gap-4 items-center justify-start py-24">
        <ServerCrash className="w-12 h-12 text-custom-primary" />
        <h2 className="text-xl">Something went wrong</h2>
        <p className="md:text-base">Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mr-auto space-y-6 py-4">
      {userDocuments.length > 0 && (
        <div className="flex flex-col gap-2 text-start">
          <h3 className="text-lg font-medium text-foreground">
            Uploaded Documents
          </h3>
          <div className="space-y-4">
            {userDocuments.map((doc: any, index: number) => (
              <div
                key={doc._id}
                className="flex items-center justify-between border rounded-xl px-4 py-3 relative"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {doc.mimeType} — Uploaded{" "}
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setIsLightboxOpen(true);
                  }}
                  className="text-primary font-medium text-sm hover:underline cursor-pointer"
                >
                  View
                </button>
                <span className="absolute -top-3 right-0 text-yellow-800 bg-yellow-300 px-4 rounded-full capitalize text-[10px] py-0.5 font-bold">
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="document"
            render={() => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-normal">
                  Upload Image
                </FormLabel>

                <FormControl>
                  {!preview ? (
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
                          : "border-muted-foreground/25",
                        (isProcessing || isPendingDocument) &&
                          "opacity-50 pointer-events-none",
                      )}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-muted-foreground text-sm">
                        Drag & drop an image here, or{" "}
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
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        multiple={false}
                        disabled={isPendingDocument || isProcessing}
                      />
                    </div>
                  ) : (
                    <div className="relative w-48 h-48 border rounded-xl overflow-hidden">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-white/70 rounded-full p-1 hover:bg-red-100 transition"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  )}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {error && <CustomAlert variant="destructive" message={error} />}

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="btn-primary rounded-full px-12"
              disabled={
                mutation.isPending ||
                isProcessing ||
                isPendingDocument ||
                !preview
              }
            >
              {isProcessing || mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Image"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={allDocumentUrls}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
}
