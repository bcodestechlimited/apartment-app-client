import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

import React from "react";

interface AddTenantRaringProps {
  isOpen: boolean;
  closeModal: () => void;
}
const TenantRating = ({ isOpen, closeModal }: AddTenantRaringProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto py-12 rounded-4xl">
        <p className="font-[500] text-[20px]">Rate Tenant</p>
        <hr />
        <div>
          <div className="flex justify-center gap-6">
            <Star className="" size={30} />
            <Star className="" size={30} />
            <Star className="" size={30} />
            <Star className="" size={30} />
            <Star className="" size={30} />
          </div>
          <div className="flex justify-center py-6">
            <Textarea className="w-100 h-30 " placeholder="Leave a comment" />
          </div>
        </div>
        <hr />
        <p className="text-center bg-[#004542] rounded-sm">Submit</p>
      </DialogContent>
    </Dialog>
  );
};

export default TenantRating;
