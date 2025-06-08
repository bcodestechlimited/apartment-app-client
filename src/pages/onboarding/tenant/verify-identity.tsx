import { FileInput } from "@/components/custom/file-input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

export default function VerifyIdentity() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const files = watch("document") || [];
  const navigate = useNavigate();

  useEffect(() => {
    register("document", {
      required: "Please upload a document",
    });
  }, [register]);

  const onSubmit = (data: any) => {
    console.log({ data });

    const filesArray = data.document ? Array.from(data.document) : [];
    console.log({ filesArray });
    // Handle file upload
    navigate("/onboarding/tenant/looking-for");
  };

  console.log({ errors });

  return (
    <div className=" bg-white flex flex-col gap-12 justify-center items-center px-4 w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
        <p>Upload Government ID (Dirver's License, National ID, Passport)</p>

        <FileInput
          accept=".jpg,.jpeg,.png,.pdf"
          value={files}
          numberOfFiles={1}
          onFilesChange={(files) => {
            console.log({ files });

            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            setValue("document", dataTransfer.files, {
              shouldValidate: true, // ✅ triggers internal validation
            });

            trigger("document");
          }}
          errorMessage={errors?.document?.message as string | undefined}
        />

        <Button className="w-full bg-custom-primary text-white hover:opacity-90 cursor-pointer">
          Continue
        </Button>
      </form>
    </div>
  );
}
