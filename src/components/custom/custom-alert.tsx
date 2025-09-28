import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircleIcon, CircleCheckBig, Info, XCircle } from "lucide-react";

export type AlertVariant = "destructive" | "default" | "success" | "info";

// export interface AlertMessage {
//   message: string; // Optional heading
//   description: string; // Main alert message
//   type: AlertVariant; // Determines styling
// }

interface CustomAlertProps {
  variant?: AlertVariant;
  message: string | React.ReactNode;
  description?: string;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  destructive: "bg-rose-50 border-rose-300 text-rose-700",
  default: "bg-blue-50 border-blue-300 text-blue-700",
  success: "bg-green-50 border-green-300 text-green-700",
  info: "bg-slate-50 border-slate-300 text-slate-700",
};

const variantIcons: Record<AlertVariant, React.ElementType> = {
  destructive: AlertCircleIcon,
  default: Info,
  success: CircleCheckBig,
  info: XCircle,
};

export function CustomAlert({
  variant = "default",
  message,
  description,
  className,
}: CustomAlertProps) {
  const Icon = variantIcons[variant];

  return (
    <Alert
      className={cn(
        "mb-4 mt-3 rounded flex items-center gap-1 w-full py-2",
        className,
        variantStyles[variant]
      )}
    >
      <Icon className="!h-4 !w-4 shrink-0 mb-1" />
      <div className="flex flex-col">
        <AlertTitle className="text-sm font-medium tracking-wide">
          {message}
        </AlertTitle>
        {description && (
          <AlertDescription
            className={cn(`text-xs opacity-90`, variantStyles[variant])}
          >
            {description}
          </AlertDescription>
        )}
      </div>
    </Alert>
  );
}
