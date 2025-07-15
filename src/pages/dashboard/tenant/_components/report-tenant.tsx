import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


interface AddTenantReportProps {
  isOpen: boolean;
  closeModal: () => void;
}
const ReportTenant = ({ isOpen, closeModal }: AddTenantReportProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto py-12 rounded-4xl">
        <p className="font-[500] text-[20px]">Rate Tenant</p>
        <hr />
        <div className="px-6">
          <p>Reason</p>
          <div className="flex w-full ">
            <Select>
              <SelectTrigger className="w-100">
                <SelectValue placeholder="-select-" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex py-6">
            <Textarea className="w-100 h-30 " placeholder="Leave a comment" />
          </div>
        </div>
        <hr />
        <p className="text-center bg-[#004542] rounded-sm">Submit</p>
      </DialogContent>
    </Dialog>
  );
};

export default ReportTenant;
