import { walletService } from "@/api/wallet.api";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AnimationWrapper from "@/components/animations/animation-wrapper";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheckIcon, AlertCircleIcon, CreditCardIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

const LandlordPaymentVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["paystack-verification", reference],
    queryFn: () => walletService.verifyPayment(reference as string),
    enabled: !!reference,
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-background">
      <AnimationWrapper className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center flex flex-col items-center gap-2">
            {isLoading && (
              <div className="bg-primary/10 p-4 rounded-full mb-2">
                <Spinner className="size-8 text-custom-primary" />
              </div>
            )}
            {isSuccess && (
              <div className="bg-green-100 p-4 rounded-full mb-2">
                <BadgeCheckIcon className="size-10 text-green-600" />
              </div>
            )}
            {isError && (
              <div className="bg-red-100 p-4 rounded-full mb-2">
                <AlertCircleIcon className="size-10 text-red-600" />
              </div>
            )}
            <CardTitle className="text-2xl font-bold">
              {isLoading && "Verifying Transaction"}
              {isSuccess && "Payment Confirmed!"}
              {isError && "Verification Failed"}
            </CardTitle>
            <CardDescription>
              {reference
                ? `Ref: ${reference}`
                : "No transaction reference found"}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center space-y-4">
            {isLoading && (
              <p className="text-muted-foreground">
                Please wait while we confirm your payment with the processor. Do
                not refresh this page.
              </p>
            )}

            {isSuccess && (
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Your wallet has been successfully funded. You can now proceed
                  to book properties or manage your listings.
                </p>
              </div>
            )}

            {isError && (
              <p className="text-muted-foreground">
                We couldn't verify your payment. If you were debited, please
                contact support with your transaction reference.
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            {(isSuccess || isError) && (
              <Button
                className="w-full btn-primary h-11"
                onClick={() => navigate("/dashboard/landlord/wallet")}
              >
                {isSuccess ? "Go to Wallet" : "Return to Dashboard"}
              </Button>
            )}

            {isLoading && (
              <Button variant="ghost" disabled className="w-full">
                Securely verifying...
              </Button>
            )}
          </CardFooter>
        </Card>
      </AnimationWrapper>
    </div>
  );
};

export default LandlordPaymentVerification;
