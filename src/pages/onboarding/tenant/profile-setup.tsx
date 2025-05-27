import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useFormContext } from "react-hook-form";

export default function ProfileSetup() {
  const { register, handleSubmit } = useFormContext();

  const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/onboarding/verify-identity");
  // };

  const onSubmit = (data: any) => {
    console.log(data);
    navigate("/onboarding/verify-identity");
  };

  return (
    <div className=" bg-white flex flex-col gap-12 justify-center items-center px-4 w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
        <Input
          {...register("firstname", {
            // required: "First name is required",
            // minLength: {
            //   value: 2,
            //   message: "First name must be at least 2 characters",
            // },
          })}
          placeholder="Enter your first name"
          className="bg-white border border-gray-300 placeholder:text-gray-400"
        />
        <Input
          {...register("lastname", {
            // required: "Last name is required",
            // minLength: {
            //   value: 2,
            //   message: "Last name must be at least 2 characters",
            // },
          })}
          placeholder="Enter your last name"
          className="bg-white border border-gray-300 placeholder:text-gray-400"
        />
        <Input
          {...register("phoneNumber", {
            required: "Phone number is required",
            // minLength: {
            //   value: 10,
            //   message: "Phone number must be at least 10 characters",
            // },
          })}
          placeholder="Enter your phone number"
          className="bg-white border border-gray-300 placeholder:text-gray-400"
        />
        <Input
          {...register("email", {
            // required: "Email is required",
            // pattern: {
            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //   message: "Invalid email address",
            // },
          })}
          placeholder="Enter your email address"
          className="bg-white border border-gray-300 placeholder:text-gray-400"
        />

        <Button className="w-full bg-custom-primary text-white hover:opacity-90 cursor-pointer">
          Continue
        </Button>
      </form>
    </div>
  );
}
