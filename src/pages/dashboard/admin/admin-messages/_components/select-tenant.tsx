import { useTenants } from "@/hooks/useTenants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { messageService } from "@/api/message.api";
import { toast } from "sonner";

interface SelectTenantDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SelectTenantDialog({
  isOpen,
  onClose,
}: SelectTenantDialogProps) {
  const { data } = useTenants({ page: 1, limit: 100 });

  const startConvo = useMutation({
    mutationFn: messageService.createConversation,
    onSuccess: () => {
      onClose();
      toast.success("Conversation started successfully!");
    },
    onError: (error) => {
      console.error({ error });
    },
  });

  const handleSubmit = async (tenantUserId: string) => {
    if (!tenantUserId) return;

    startConvo.mutateAsync({
      receiverId: tenantUserId,
    });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-2 py-6">
        <DialogHeader>
          <DialogTitle>Select a Tenant</DialogTitle>
          <DialogDescription>
            Choose a tenant from the list below to start a conversaton
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {data?.tenants?.map((tenant: any) => (
            <div
              key={tenant._id}
              className="p-3 rounded-md hover:bg-muted-foreground/10 cursor-pointer"
              onClick={() => {
                handleSubmit(tenant.user._id);
              }}
            >
              <p className="font-medium">
                {tenant.user.firstName
                  ? `${tenant.user.firstName} ${tenant.user.lastName}`
                  : tenant.user.email}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {tenant.email}
              </p>
            </div>
          ))}

          {!data?.tenants?.length && (
            <p className="text-sm text-muted-foreground">No tenants found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
