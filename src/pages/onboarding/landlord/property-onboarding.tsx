import Header from "@/components/common/header";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { FileInput } from "@/components/file-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PropertyOnboarding() {
  return (
    <div className="w-full max-w-3xl flex flex-col gap-4">
      <Header text="Property Onboarding" />
      <p>
        Tell us about property and it's features to get matched with the right
        tenant
      </p>

      <div className="border flex justify-center md:justify-between w-full p-4 rounded-lg">
        <p className=" font-semibold w-1/3 text-start hidden md:block">
          Property Information
        </p>
        <div className=" flex flex-col gap-3 w-full md:w-2/3">
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex justify-between">
              <p className=" font-semibold">Description</p>
              <small>200 words</small>
            </div>
            <Textarea
              placeholder="Write a short overview of your property"
              className="min-h-28"
            />
          </div>

          <div className=" flex flex-col gap-4">
            <p className=" text-start font-semibold">Key Features</p>
            <div className="flex flex-col sm:flex-row justify-between gap-6 ">
              <div className="flex flex-col items-start gap-2 w-full sm:w-1/2">
                <Label htmlFor="noOfRooms">No of rooms</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col items-start gap-2 w-full sm:w-1/2">
                <Label htmlFor="noOfRooms">Amenities</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-4">
            <p className=" text-start font-semibold">
              Upload Images of your property
            </p>
            <FileInput
            // {...register("document", {
            //   required: "Documents are required",
            // })}
            // multiple
            // accept=".jpg,.jpeg,.png,.pdf"
            // value={files}
            // onFilesChange={(files) => {
            //   console.log({ files });

            //   const dataTransfer = new DataTransfer();
            //   files.forEach((file) => dataTransfer.items.add(file));
            //   // setValue("documents", dataTransfer.files);
            // }}
            // errorMessage={
            //   errors?.documents &&
            //   (errors.documents?.message as string | undefined)
            // }
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button className="px-10 cursor-pointer">Cancel</Button>
        <Button className="px-6 cursor-pointer">Publish listing</Button>
      </div>
    </div>
  );
}

const amenities = ["Wi-Fi", "Air-Conditioner", "Power-Backup", "Coffee"];
const pricingModels = ["Hourly", "Daily", "Monthly", "Yearly"];

export function PropertyOnboardingWorkSpace() {
  return (
    <div className="w-full max-w-3xl flex flex-col gap-4 pb-6">
      <Header text="Property Onboarding" />
      <p>
        Tell us about property and it's features to get matched with the right
        tenant
      </p>

      <div className="border flex justify-center md:justify-between w-full p-4 rounded-lg">
        <p className=" font-semibold w-1/3 text-start hidden md:block">
          Property Information
        </p>
        <div className=" flex flex-col gap-3 w-full md:w-2/3">
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex justify-between">
              <p className=" font-semibold">Description</p>
              <small>200 words</small>
            </div>
            <Textarea
              placeholder="Write a short overview of your property"
              className="min-h-28"
            />
          </div>

          <div className=" flex flex-col gap-4">
            <p className=" text-start font-semibold">Key Features</p>
            <div className="flex flex-col gap-2 text-sm">
              <p className=" text-start font-semibold">Add amenities</p>
              <div className="flex flex-wrap gap-2 ">
                {amenities.map((amenity) => (
                  <div className="flex items-center gap-2 border px-4 py-1 rounded-full w-fit">
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-start flex flex-col gap-2 text-sm">
              <p className=" text-start font-semibold">Set availability</p>
              <Input className=" rounded-full" />
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <p className=" text-start font-semibold">Set pricing models</p>
              <div className="flex flex-wrap gap-2 ">
                {pricingModels.map((pricingModel) => (
                  <div className="flex items-center gap-2 border px-4 py-1 rounded-full w-fit">
                    <span>{pricingModel}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-start flex flex-col gap-2 text-sm">
              <p className=" text-start font-semibold">
                Define seating capacity
              </p>
              <Input className=" rounded-full" />
            </div>

            <div className=" flex flex-col gap-4">
              <p className=" text-start font-semibold">
                Upload Images of your property
              </p>
              <FileInput
              // {...register("document", {
              //   required: "Documents are required",
              // })}
              // multiple
              // accept=".jpg,.jpeg,.png,.pdf"
              // value={files}
              // onFilesChange={(files) => {
              //   console.log({ files });

              //   const dataTransfer = new DataTransfer();
              //   files.forEach((file) => dataTransfer.items.add(file));
              //   // setValue("documents", dataTransfer.files);
              // }}
              // errorMessage={
              //   errors?.documents &&
              //   (errors.documents?.message as string | undefined)
              // }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button className="px-10 cursor-pointer">Cancel</Button>
        <Button className="px-6 cursor-pointer">Publish listing</Button>
      </div>
    </div>
  );
}
