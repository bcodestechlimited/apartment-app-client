// // src/pages/admin/payments/_components/WithdrawalModal.tsx
// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Landmark, User, Hash, AlertCircle } from "lucide-react";

// interface WithdrawalModalProps {
//   transaction: any;
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: (action: "approved" | "rejected", reason?: string) => void;
//   isUpdating: boolean;
// }

// export function WithdrawalModal({
//   transaction,
//   isOpen,
//   onClose,
//   onConfirm,
//   isUpdating,
// }: WithdrawalModalProps) {
//   console.log(" WithdrawalModal transaction", transaction);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [isRejecting, setIsRejecting] = useState(false);

//   if (!transaction) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Process Withdrawal Request</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           <div className="bg-slate-50 p-4 rounded-lg space-y-3">
//             <div className="flex items-center gap-2 text-sm">
//               <User className="h-4 w-4 text-slate-500" />
//               <span className="font-medium">
//                 {transaction.user?.firstName} {transaction.user?.lastName}
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-sm">
//               <Landmark className="h-4 w-4 text-slate-500" />
//               <span>{transaction.bankName}</span>
//             </div>
//             <div className="flex items-center gap-2 text-sm">
//               <Hash className="h-4 w-4 text-slate-500" />
//               <span className="font-mono">{transaction.bankAccountNumber}</span>
//             </div>
//             <div className="pt-2 border-t font-bold text-lg text-teal-700">
//               ₦{transaction.amount?.toLocaleString()}
//             </div>
//           </div>

//           {isRejecting && (
//             <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
//               <label className="text-sm font-medium text-red-600 flex items-center gap-1">
//                 <AlertCircle className="h-3 w-3" /> Reason for Rejection
//               </label>
//               <Textarea
//                 placeholder="Enter reason..."
//                 value={rejectionReason}
//                 onChange={(e) => setRejectionReason(e.target.value)}
//               />
//             </div>
//           )}
//         </div>

//         <DialogFooter className="gap-2 sm:gap-0">
//           {!isRejecting ? (
//             <>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsRejecting(true)}
//                 className="text-red-600 border-red-200 hover:bg-red-50"
//               >
//                 Reject Request
//               </Button>
//               <Button
//                 onClick={() => onConfirm("approved")}
//                 disabled={isUpdating}
//                 className="bg-teal-700"
//               >
//                 Approve & Pay
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button variant="ghost" onClick={() => setIsRejecting(false)}>
//                 Cancel
//               </Button>
//               <Button
//                 variant="destructive"
//                 disabled={!rejectionReason || isUpdating}
//                 onClick={() => onConfirm!("rejected", rejectionReason)}
//               >
//                 Confirm Rejection
//               </Button>
//             </>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// src/pages/admin/payments/_components/WithdrawalModal.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Landmark, User, Hash, AlertCircle, Loader2 } from "lucide-react";

interface WithdrawalModalProps {
  transaction: any;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (action: "approved" | "rejected", reason?: string) => void;
  isUpdating: boolean;
}

export function WithdrawalModal({
  transaction,
  isOpen,
  onClose,
  onConfirm,
  isUpdating,
}: WithdrawalModalProps) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  if (!transaction) return null;

  const handleConfirmRejection = () => {
    if (!rejectionReason.trim()) return;
    onConfirm("rejected", rejectionReason);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Process Withdrawal Request</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-slate-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-slate-500" />
              <span className="font-medium">
                {transaction.user?.firstName} {transaction.user?.lastName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Landmark className="h-4 w-4" />
              <span>{transaction.bankName || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Hash className="h-4 w-4" />
              <span className="font-mono">
                {transaction.bankAccountNumber || "N/A"}
              </span>
            </div>
            <div className="pt-2 border-t font-bold text-lg text-teal-700">
              ₦{transaction.amount?.toLocaleString()}
            </div>
          </div>

          {isRejecting && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <label className="text-sm font-medium text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> Reason for Rejection
              </label>
              <Textarea
                placeholder="Explain why this withdrawal is being rejected..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                disabled={isUpdating}
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {!isRejecting ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsRejecting(true)}
                disabled={isUpdating}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Reject
              </Button>
              <Button
                onClick={() => onConfirm("approved")}
                disabled={isUpdating}
                className="bg-teal-700 hover:bg-teal-800"
              >
                {isUpdating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Approve & Pay
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => setIsRejecting(false)}
                disabled={isUpdating}
              >
                Back
              </Button>
              <Button
                variant="destructive"
                disabled={!rejectionReason.trim() || isUpdating}
                onClick={handleConfirmRejection}
              >
                {isUpdating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirm Rejection
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
