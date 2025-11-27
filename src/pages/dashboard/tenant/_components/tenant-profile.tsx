import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Phone, Mail, Star, OctagonAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface AddTenantProfileProps {
  isOpen: boolean;
  closeModal: () => void;
  tenant: any;
  openRatingModal: (tenant: any) => void;
  openReportModal: (tenant: any) => void;
}

const TenantProfile = ({
  isOpen,
  closeModal,
  tenant,
  openRatingModal,
  openReportModal,
}: AddTenantProfileProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tenant Info</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col gap-4 mt-3">
          <img src={tenant.avatar} className="w-10 rounded-full" />

          <div className="flex gap-3 items-center">
            <p className="font-[500] text-[18px]">
              {tenant?.firstName} {tenant?.lastName}
            </p>
            <Check className="bg-green-500 text-white rounded-sm w-4 h-4" />
          </div>

          <div className="flex gap-4">
            <Phone className="w-4" />
            <p className="text-[#616161]">{tenant.phoneNumber}</p>
          </div>

          <div className="flex gap-4">
            <Mail className="w-4" />
            <p className="text-[#616161]">{tenant.email}</p>
          </div>

          <Separator />

          <div className="flex gap-4 mt-4">
            <Button
              className="btn-primary"
              onClick={() => openRatingModal(tenant)}
            >
              <Star />
              Rate
            </Button>

            <Button
              className="btn-primary"
              onClick={() => openReportModal(tenant)}
            >
              <OctagonAlert className="w-4" />
              Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TenantProfile;
