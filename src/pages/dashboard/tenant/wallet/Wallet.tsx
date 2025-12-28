import { walletService } from "@/api/wallet.api";
import { WalletTransactionsTable } from "./WalletTransaction";
import { Spinner } from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

function Wallet() {
  const [amount, setAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const queryClient = useQueryClient();

  const createTopUpMutation = useMutation({
    mutationFn: (amt: any) => walletService.topUpWallet(amt),
    onSuccess: (res: any) => {
      const redirectUrl = res?.authorization_url;
      if (redirectUrl) window.location.href = redirectUrl;
      else toast.error("Unable to start payment. Try again.");
    },
    onError: (error: any) => toast.error(error?.message || "Top up failed"),
  });

  const withdrawMutation = useMutation({
    mutationFn: (amt: any) => walletService.withdrawFunds(amt),
    onSuccess: () => {
      toast.success("Withdrawal request submitted!");
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
    onError: (error: any) => toast.error(error?.message || "Withdraw failed"),
  });

  const updateWalletMutation = useMutation({
    mutationFn: (payload: any) => walletService.updateWalletDetails(payload),
    onSuccess: () => {
      toast.success("Wallet details updated");
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
    onError: (error: any) => toast.error(error?.message || "Update failed"),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["wallet"],
    queryFn: () => walletService.getUserWallet(),
  });

  const { data: banks, isLoading: isLoadingBanks } = useQuery({
    queryKey: ["banks"],
    queryFn: () => walletService.getBanks(),
  });

  const { data: accountDetails, isLoading: isLoadingAccountDetails } = useQuery(
    {
      queryKey: ["accountDetails", bankCode, accountNumber],
      queryFn: () => walletService.verifyAccountNumber(bankCode, accountNumber),
      enabled: accountNumber.length === 10 && !!bankCode,
      retry: false,
    }
  );

  if (isLoading) return <Spinner />;

  const wallet = data?.wallet ?? {};
  const balance = typeof wallet.balance === "number" ? wallet.balance : 0;
  const transactions: any[] = Array.isArray(wallet.transactions)
    ? wallet.transactions
    : [];

  const formatNaira = (n: number) => `₦${Number(n || 0).toLocaleString()}`;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">Your Wallet</h1>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 w-full md:w-80">
            <p className="text-sm text-gray-600 mb-1">Available balance</p>
            <p className="text-4xl font-bold">{formatNaira(balance)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 md:pt-12">
          {/* TOP UP */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-teal-800 hover:bg-teal-900 px-8 py-6 rounded-lg text-white w-full md:w-64">
                Top up wallet
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-[425px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!amount || amount <= 0) {
                    toast.error("Enter a valid amount");
                    return;
                  }
                  createTopUpMutation.mutateAsync(amount);
                }}
              >
                <DialogHeader>
                  <DialogTitle>Top Up Wallet</DialogTitle>
                  <DialogDescription>
                    Add funds to your wallet by entering an amount below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-3">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      min={1}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      value={amount || ""}
                    />
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={createTopUpMutation.isPending}
                  >
                    {createTopUpMutation.isPending ? "Processing..." : "Top Up"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* WITHDRAW */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-300 px-8 py-6 rounded-lg w-full md:w-64"
              >
                Withdraw
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-[425px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!withdrawAmount || withdrawAmount <= 0) {
                    toast.error("Enter a valid withdrawal amount");
                    return;
                  }
                  withdrawMutation.mutateAsync(withdrawAmount);
                }}
              >
                <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                  <DialogDescription>
                    Enter the amount you want to withdraw.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-3">
                    <Label htmlFor="withdraw">Withdraw Amount</Label>
                    <Input
                      id="withdraw"
                      type="number"
                      min={1}
                      onChange={(e) =>
                        setWithdrawAmount(Number(e.target.value))
                      }
                      value={withdrawAmount || ""}
                    />
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={withdrawMutation.isPending}>
                    {withdrawMutation.isPending ? "Submitting..." : "Withdraw"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* UPDATE DETAILS */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-300 px-8 py-6 rounded-lg w-full md:w-64"
              >
                Update details
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-[425px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!bankCode || accountNumber.length !== 10) {
                    toast.error(
                      "Select a bank and enter a 10-digit account number"
                    );
                    return;
                  }
                  updateWalletMutation.mutateAsync({ accountNumber, bankCode });
                }}
              >
                <DialogHeader>
                  <DialogTitle>Update Wallet Details</DialogTitle>
                  <DialogDescription>
                    Update your bank account details for withdrawals.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Bank</Label>
                    <Select
                      value={bankCode}
                      onValueChange={(code) => setBankCode(code)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingBanks ? "Loading..." : "Select a bank"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="h-60">
                        {banks?.banks?.map((bank: any) => (
                          <SelectItem key={bank.id} value={bank.code}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Account Number</Label>
                    <Input
                      maxLength={10}
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  {isLoadingAccountDetails && <Spinner />}
                  {accountDetails && (
                    <div className="p-2 bg-gray-50 rounded border text-sm">
                      <p>
                        <strong>Name:</strong>{" "}
                        {accountDetails?.data?.account_name}
                      </p>
                    </div>
                  )}
                </div>
                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={updateWalletMutation.isPending}
                  >
                    {updateWalletMutation.isPending ? "Updating..." : "Update"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Wallet Details Display */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold mb-6">Wallet Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Account Name:</p>
            <p className="font-medium">{wallet.bankAccountName ?? "—"}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Bank Name:</p>
            <p className="font-medium">{wallet.bankName ?? "—"}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Account Number:</p>
            <p className="font-medium">{wallet.bankAccountNumber ?? "—"}</p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold mb-6">History</h2>
        <WalletTransactionsTable transactions={transactions} />
      </div>
    </div>
  );
}

export default Wallet;
