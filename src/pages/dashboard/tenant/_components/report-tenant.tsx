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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { reportService } from "@/api/report.api";

interface AddTenantReportProps {
  isOpen: boolean;
  closeModal: () => void;
  reportedUser: string;
}

const ReportTenant = ({
  isOpen,
  closeModal,
  reportedUser,
}: AddTenantReportProps) => {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  // console.log("reportedUser", reportedUser);

  const predefinedReasons = [
    "Defaulting on rent",
    "Damage to property",
    "Noise disturbance",
    "Harassment or threats",
    "Illegal activities",
    "Violation of rental agreement",
    "Other",
  ];

  const createReportMutation = useMutation({
    mutationFn: ({
      reportedUserId,
      payload,
    }: {
      reportedUserId: string;
      payload: any;
    }) => reportService.createReport(reportedUserId, payload),
    onSuccess: () => {
      toast.success("Report added successfully!");
      closeModal();
      setReason(""); // Reset state
      setComment("");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  const handleSubmit = () => {
    // Pass a single object to the mutate function
    createReportMutation.mutate({
      reportedUserId: reportedUser,
      payload: { reason, comment },
    });
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
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>

              <SelectContent>
                {predefinedReasons.map((r) => (
                  <SelectItem key={r} value={r} className="cursor-pointer">
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
          className="w-full bg-custom-primary hover:bg-[#00332f] cursor-pointer"
          onClick={() => {
            handleSubmit();
          }}
          disabled={!reason || (reason === "Other" && comment.trim() === "")}
        >
          Submit Report
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReportTenant;
