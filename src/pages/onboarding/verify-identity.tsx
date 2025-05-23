import { FileInput } from "@/components/file-input";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

export default function VerifyIdentity() {
  const {
    register,
    handleSubmit,
    // setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const files = watch("document");

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log({ data });

    const filesArray = data.documents ? Array.from(data.documents) : [];
    console.log({ filesArray });
    // Handle file upload
    navigate("/onboarding/looking-for");
  };

  // console.log({ errors });

  return (
    <div className=" bg-white flex flex-col gap-12 justify-center items-center px-4 w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
        <p>Upload Government ID (Dirver's License, National ID, Passport)</p>

        <FileInput
          {...register("document", {
            required: "Documents are required",
          })}
          multiple
          accept=".jpg,.jpeg,.png,.pdf"
          value={files}
          onFilesChange={(files) => {
            console.log({ files });

            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            // setValue("documents", dataTransfer.files);
          }}
          errorMessage={
            errors?.documents &&
            (errors.documents?.message as string | undefined)
          }
        />

        {/* <Input
          {...register("documents", {
            required: "Documents are required",
          })}
          type="file"
        /> */}

        <Button className="w-full bg-custom-primary text-white hover:opacity-90 cursor-pointer">
          Continue
        </Button>
      </form>
    </div>
  );
}
