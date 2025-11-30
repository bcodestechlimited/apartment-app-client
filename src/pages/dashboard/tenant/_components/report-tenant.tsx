import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AddTenantReportProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ReportTenant = ({ isOpen, closeModal }: AddTenantReportProps) => {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  const predefinedReasons = [
    "Defaulting on rent",
    "Damage to property",
    "Noise disturbance",
    "Harassment or threats",
    "Illegal activities",
    "Violation of rental agreement",
    "Other",
  ];

  const handleSubmit = () => {
    // Add your submit logic
    console.log({ reason, comment });

    // Close modal
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Report Tenant
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">Reason</p>

            <Select onValueChange={setReason}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>

              <SelectContent>
                {predefinedReasons.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="font-medium mb-2">Additional Details</p>
            <Textarea
              placeholder="Provide more information about the issue..."
              className="min-h-[120px]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <Button
          className="w-full bg-[#004542] hover:bg-[#00332f]"
          onClick={handleSubmit}
          disabled={!reason || (reason === "Other" && comment.trim() === "")}
        >
          Submit Report
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReportTenant;
