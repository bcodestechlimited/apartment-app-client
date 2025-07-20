import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  symbol?: string;
}

const CurrencyInput = ({
  className,
  symbol = "₦",
  ...props
}: CurrencyInputProps) => {
  return (
    <div className="relative flex border rounded-sm">
      <Input
        value={symbol}
        readOnly
        disabled
        className="w-10 border-0 bg-gray-100 rounded-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
      />
      <Input
        inputMode="numeric"
        className={cn(" border-0 rounded-none ", className)}
        {...props}
      />
    </div>
  );
};

export default CurrencyInput;
