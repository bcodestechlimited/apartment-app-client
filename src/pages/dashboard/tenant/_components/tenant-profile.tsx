import { Dialog, DialogContent } from "@/components/ui/dialog";
import tenantprofileimage from "@/assets/images/tenantprofileimage.png";
import { Check, Phone, Mail, Star, OctagonAlert } from "lucide-react";
import React from "react";

interface AddTenantProfileProps {
  isOpen: boolean;
  closeModal: () => void;
}

const TenantProfile = ({ isOpen, closeModal }: AddTenantProfileProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto py-12 rounded-4xl">
        <p className="font-[500] text-[20px]">Tenant Info</p>
        <hr />
        <div className="flex flex-col gap-4 mt-3">
          <div>
            <img src={tenantprofileimage} className="w-10" alt="" />
          </div>
          <div className="flex gap-3 items-center">
            <p className="font-[500] text-[18px]">Ashley Walters</p>
            <Check className="bg-green-500 text-white rounded-sm w-4 h-4" />
          </div>
          <div className="flex gap-4">
            <Phone className="w-4" />
            <p className="text-[#616161]">09076237409</p>
          </div>
          <div className="flex gap-4">
            <Mail className="w-4" />
            <p className="text-[#616161]">ashleywalters@.com</p>
          </div>

          <p className="underline text-[#004542] ">View booking history</p>
          <hr />

          <div className="flex gap-4 mt-4">
            <button className="flex gap-2 border border-gray-500 rounded-lg bg-[#004542] text-white px-6 py-1">
              <Star className="w-2 " color="white" fill="white" />
              Rate
            </button>
            <button className=" flex gap-3 border border-gray-200 rounded-lg  text-[#004542] px-6 py-1">
              <OctagonAlert className="w-4" />
              Report
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TenantProfile;
