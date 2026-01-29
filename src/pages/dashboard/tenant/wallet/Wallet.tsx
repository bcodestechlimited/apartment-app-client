import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Wallet as WalletIcon,
  ArrowDownLeft,
  Settings2,
  Landmark,
  User,
  Hash,
  AlertCircle,
  Loader2,
  Plus,
} from "lucide-react";

import { walletService } from "@/api/wallet.api";
import { Spinner } from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";
import { transactionService } from "@/api/transaction.api";
import DataTable from "@/components/custom/data-table";
import { columns } from "../payments/payments";

function Wallet() {
  // --- Modal States ---
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  const [amount, setAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const queryClient = useQueryClient();

  //payement mutations
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data: payment, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ["transactions", { page, limit }],
    queryFn: () =>
      transactionService.getAllUserTransactions({
        page: 1,
        limit: 10,
      }),
  });

  // --- Mutations ---
  const createTopUpMutation = useMutation({
    mutationFn: (amt: any) => walletService.topUpWallet(amt),
    onSuccess: (res: any) => {
      setIsTopUpOpen(false); // Close modal
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
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setWithdrawAmount(0); // Reset amount
      setIsWithdrawOpen(false); // Close modal
    },
    onError: (error: any) => toast.error(error?.message || "Withdraw failed"),
  });

  const updateWalletMutation = useMutation({
    mutationFn: (payload: any) => walletService.updateWalletDetails(payload),
    onSuccess: () => {
      toast.success("Wallet details updated");
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      setIsSettingsOpen(false); // Close modal
    },
    onError: (error: any) => toast.error(error?.message || "Update failed"),
  });

  // --- Queries ---
  const { data, isLoading: isLoading } = useQuery({
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
    },
  );

  if (isLoading || isLoadingTransactions)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Spinner />
      </div>
    );

  const wallet = data?.wallet ?? {};
  const balance = typeof wallet.balance === "number" ? wallet.balance : 0;

  const formatNaira = (n: number) => `₦${Number(n || 0).toLocaleString()}`;

  return (
    <div className=" space-y-8 ">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-slate-500">
            Manage your earnings, top-ups, and payout settings.
          </p>
        </div>

        {/* ACTION BUTTONS GROUP */}
        <div className="flex flex-wrap gap-3">
          {/* UPDATE DETAILS */}
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 gap-2"
              >
                <Settings2 className="h-4 w-4" />
                Payout Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateWalletMutation.mutate({ accountNumber, bankCode });
                }}
              >
                <DialogHeader>
                  <DialogTitle>Update Payout Details</DialogTitle>
                  <DialogDescription>
                    Set the account where you'll receive your funds.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Select Bank</Label>
                    <Select value={bankCode} onValueChange={setBankCode}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingBanks
                              ? "Fetching banks..."
                              : "Choose your bank"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="h-64">
                        {banks?.banks?.map((bank: any) => (
                          <SelectItem key={bank.id} value={bank.code}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input
                      maxLength={10}
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="0123456789"
                    />
                  </div>
                  {isLoadingAccountDetails && (
                    <div className="flex justify-center py-2">
                      <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
                    </div>
                  )}
                  {accountDetails?.data && (
                    <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg flex items-center gap-3">
                      <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xs uppercase">
                        {accountDetails.data.account_name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-teal-900 leading-none">
                          {accountDetails.data.account_name}
                        </p>
                        <p className="text-[10px] text-teal-600 font-medium uppercase mt-1 tracking-wider">
                          Verified Account
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="bg-teal-800"
                    disabled={
                      updateWalletMutation.isPending || !accountDetails?.data
                    }
                  >
                    {updateWalletMutation.isPending
                      ? "Saving..."
                      : "Save Details"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* WITHDRAW */}
          <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-orange-200 text-orange-700 hover:bg-orange-50 gap-2"
              >
                <ArrowDownLeft className="h-4 w-4" />
                Withdraw
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (withdrawAmount > 0)
                    withdrawMutation.mutate(withdrawAmount);
                }}
              >
                <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                  <DialogDescription>
                    Payouts are processed to your saved bank account.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-6 space-y-4">
                  <div className="p-3 bg-slate-50 rounded-lg border flex gap-3 text-xs text-slate-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p>
                      Funds will be sent to{" "}
                      <strong>{wallet.bankName || "your bank"}</strong> (
                      {wallet.bankAccountNumber || "..."})
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="withdraw">Amount to Withdraw</Label>
                    <Input
                      id="withdraw"
                      type="number"
                      className="text-lg py-6"
                      value={withdrawAmount || ""}
                      onChange={(e) =>
                        setWithdrawAmount(Number(e.target.value))
                      }
                    />
                    <p className="text-xs text-slate-500">
                      Max available: {formatNaira(balance)}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="w-full bg-orange-600"
                    disabled={withdrawMutation.isPending || balance < 1}
                  >
                    {withdrawMutation.isPending
                      ? "Processing..."
                      : "Confirm Withdrawal"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* TOP UP */}
          <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-800 hover:bg-teal-900 gap-2">
                <Plus className="h-4 w-4" />
                Top Up
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (amount > 0) createTopUpMutation.mutate(amount);
                }}
              >
                <DialogHeader>
                  <DialogTitle>Top Up Wallet</DialogTitle>
                  <DialogDescription>
                    Funds will be added via secure payment gateway.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Enter Amount (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      className="text-lg py-6"
                      placeholder="0.00"
                      value={amount || ""}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="w-full bg-teal-800"
                    disabled={createTopUpMutation.isPending}
                  >
                    {createTopUpMutation.isPending
                      ? "Connecting..."
                      : "Proceed to Payment"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* TOP SECTION: BALANCE & BANK INFO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BALANCE CARD */}
        <Card className="lg:col-span-1 bg-teal-900 border-none shadow-xl text-white overflow-hidden relative">
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-teal-800 rounded-full blur-3xl opacity-50" />
          <CardContent className="p-8 space-y-6 relative z-10">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-teal-800/50 rounded-lg">
                <WalletIcon className="h-6 w-6 text-teal-300" />
              </div>
              <Badge className="bg-teal-800 text-teal-200 border-none uppercase text-[10px] tracking-widest">
                Active Wallet
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-teal-100/70 text-sm font-medium">
                Available Balance
              </p>
              <h2 className="text-4xl font-bold tracking-tight">
                {formatNaira(balance)}
              </h2>
            </div>
            <div className="pt-4 flex gap-4 opacity-20">
              <div className="h-2 w-12 bg-white rounded-full" />
              <div className="h-2 w-8 bg-white rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* BANK DETAILS CARD */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <CardContent className="p-0">
            <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Landmark className="h-4 w-4 text-slate-500" />
                Payout Destination
              </h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 text-left">
              <div className="space-y-1 ">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Account Name
                </p>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-300" />
                  <p className="text-sm font-semibold text-slate-700 capitalize">
                    {wallet.bankAccountName || "Not set"}
                  </p>
                </div>
              </div>
              <div className=" flex justify-evenly items-center">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Bank Provider
                  </p>
                  <div className="flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-slate-300" />
                    <p className="text-sm font-semibold text-slate-700">
                      {wallet.bankName || "Not set"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 ">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Account Number
                  </p>
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-slate-300" />
                    <p className="text-sm font-mono font-bold text-slate-700">
                      {wallet.bankAccountNumber || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RECENT TRANSACTIONS SECTION */}

      <DataTable
        columns={columns}
        data={payment?.transactions || []}
        noDataMessage="No payments available."
      />
    </div>
  );
}

export default Wallet;
