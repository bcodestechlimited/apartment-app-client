import { walletService } from "@/api/wallet.api";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheckIcon } from "lucide-react";
import { useNavigate } from "react-router";

const PaymentVerification = () => {
  const navigate = useNavigate();

  const reference = new URLSearchParams(window.location.search).get(
    "reference"
  );

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["paystack-verification"],
    queryFn: () => walletService.verifyPayment(reference as string),
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-4">
            <Spinner />
            <p className="text-sm text-muted-foreground">
              Verifying payment...
            </p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <Item variant="outline" className="w-full p-4">
            <ItemContent>
              <ItemTitle>Payment Verification</ItemTitle>
              <ItemDescription className="mt-1">
                Payment verification failed. Please try again.
              </ItemDescription>
            </ItemContent>

            <ItemActions>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate("/dashboard/wallet")}
              >
                Okay
              </Button>
            </ItemActions>
          </Item>
        )}

        {/* Success State */}
        {isSuccess && (
          <Item variant="outline" size="sm" className="w-full p-4">
            <ItemMedia>
              <BadgeCheckIcon className="size-6 text-green-500" />
            </ItemMedia>

            <ItemContent>
              <ItemTitle>Your payment was verified successfully!</ItemTitle>
            </ItemContent>

            <ItemActions>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate("/dashboard/wallet")}
              >
                Continue
              </Button>
            </ItemActions>
          </Item>
        )}
      </div>
    </div>
  );
};

export default PaymentVerification;
