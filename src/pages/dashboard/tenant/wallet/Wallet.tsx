// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { walletService } from "@/api/wallet.api";
// import { Spinner } from "@/components/custom/loader";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { toast } from "sonner";

// function Wallet() {
//   const [amount, setAmount] = useState<number>(0);
//   const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
//   const [bankCode, setBankCode] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const queryClient = useQueryClient();

//   const createTopUpMutation = useMutation({
//     mutationFn: (amt: any) => walletService.topUpWallet(amt),
//     onSuccess: (res: any) => {
//       const redirectUrl = res?.authorization_url;
//       if (redirectUrl) window.location.href = redirectUrl;
//       else toast.error("Unable to start payment. Try again.");
//     },
//     onError: (error: any) => toast.error(error?.message || "Top up failed"),
//   });

//   const withdrawMutation = useMutation({
//     mutationFn: (amt: any) => walletService.withdrawFunds(amt),
//     onSuccess: () => {
//       toast.success("Withdrawal request submitted!");
//       queryClient.invalidateQueries({ queryKey: ["wallet"] });
//     },
//     onError: (error: any) => toast.error(error?.message || "Withdraw failed"),
//   });

//   const updateWalletMutation = useMutation({
//     mutationFn: (payload: any) => walletService.updateWalletDetails(payload),
//     onSuccess: () => {
//       toast.success("Wallet details updated");
//       queryClient.invalidateQueries({ queryKey: ["wallet"] });
//     },
//     onError: (error: any) => toast.error(error?.message || "Update failed"),
//   });

//   const { data, isLoading } = useQuery({
//     queryKey: ["wallet"],
//     queryFn: () => walletService.getUserWallet(),
//   });

//   const { data: banks, isLoading: isLoadingBanks } = useQuery({
//     queryKey: ["banks"],
//     queryFn: () => walletService.getBanks(),
//   });

//   const { data: accountDetails, isLoading: isLoadingAccountDetails } = useQuery(
//     {
//       queryKey: ["accountDetails", bankCode, accountNumber],
//       queryFn: () => walletService.verifyAccountNumber(bankCode, accountNumber),
//       enabled: accountNumber.length === 10 && !!bankCode,
//       retry: false,
//     }
//   );

//   if (isLoading) return <Spinner />;

//   const wallet = data?.wallet ?? {};
//   const balance = typeof wallet.balance === "number" ? wallet.balance : 0;
//   const transactions: any[] = Array.isArray(wallet.transactions)
//     ? wallet.transactions
//     : [];

//   const formatNaira = (n: number) => `₦${Number(n || 0).toLocaleString()}`;

//   return (
//     <div className="space-y-5">
//       <h1 className="text-3xl font-semibold text-center">Your Wallet</h1>

//       {/* ACTIONS + BALANCE */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//         <div className="w-full md:w-3/5">
//           <div className="flex flex-col sm:flex-row gap-4 mt-6">
//             {/* TOP UP */}
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="bg-green-700 hover:bg-green-800 px-6 py-2 rounded-lg text-white w-full sm:w-auto">
//                   Top Up
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="w-full sm:max-w-[425px]">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     if (!amount || amount <= 0) {
//                       toast.error("Enter a valid amount");
//                       return;
//                     }
//                     createTopUpMutation.mutateAsync(amount);
//                   }}
//                 >
//                   <DialogHeader>
//                     <DialogTitle>Top Up Wallet</DialogTitle>
//                     <DialogDescription>
//                       Add funds to your wallet by entering an amount below.
//                     </DialogDescription>
//                   </DialogHeader>

//                   <div className="grid gap-4 mt-2">
//                     <div className="grid gap-3">
//                       <Label htmlFor="amount">Amount</Label>
//                       <Input
//                         id="amount"
//                         type="number"
//                         min={1}
//                         onChange={(e) => setAmount(Number(e.target.value))}
//                         value={amount || ""}
//                       />
//                     </div>
//                   </div>

//                   <DialogFooter className="flex flex-col sm:flex-row gap-2">
//                     <DialogClose asChild>
//                       <Button variant="outline" className="w-full sm:w-auto">
//                         Cancel
//                       </Button>
//                     </DialogClose>
//                     <Button
//                       type="submit"
//                       disabled={createTopUpMutation.isLoading}
//                       className="w-full sm:w-auto"
//                     >
//                       {createTopUpMutation.isLoading
//                         ? "Processing..."
//                         : "Top Up"}
//                     </Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>

//             {/* WITHDRAW */}
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg text-white w-full sm:w-auto">
//                   Withdraw
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="w-full sm:max-w-[425px]">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     if (!withdrawAmount || withdrawAmount <= 0) {
//                       toast.error("Enter a valid withdrawal amount");
//                       return;
//                     }
//                     withdrawMutation.mutateAsync(withdrawAmount);
//                   }}
//                 >
//                   <DialogHeader>
//                     <DialogTitle>Withdraw Funds</DialogTitle>
//                     <DialogDescription>
//                       Enter the amount you want to withdraw.
//                     </DialogDescription>
//                   </DialogHeader>

//                   <div className="grid gap-4 mt-2">
//                     <div className="grid gap-3">
//                       <Label htmlFor="withdraw">Withdraw Amount</Label>
//                       <Input
//                         id="withdraw"
//                         type="number"
//                         min={1}
//                         onChange={(e) =>
//                           setWithdrawAmount(Number(e.target.value))
//                         }
//                         value={withdrawAmount || ""}
//                       />
//                     </div>
//                   </div>

//                   <DialogFooter className="flex flex-col sm:flex-row gap-2">
//                     <DialogClose asChild>
//                       <Button variant="outline" className="w-full sm:w-auto">
//                         Cancel
//                       </Button>
//                     </DialogClose>
//                     <Button
//                       type="submit"
//                       disabled={withdrawMutation.isLoading}
//                       className="w-full sm:w-auto"
//                     >
//                       {withdrawMutation.isLoading
//                         ? "Submitting..."
//                         : "Withdraw"}
//                     </Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>

//             {/* UPDATE DETAILS */}
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white w-full sm:w-auto">
//                   Update Details
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="w-full sm:max-w-[425px]">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     if (!bankCode || accountNumber.length !== 10) {
//                       toast.error(
//                         "Select a bank and enter a 10-digit account number"
//                       );
//                       return;
//                     }
//                     updateWalletMutation.mutateAsync({
//                       accountNumber,
//                       bankCode,
//                     });
//                   }}
//                 >
//                   <DialogHeader>
//                     <DialogTitle>Update Wallet Details</DialogTitle>
//                     <DialogDescription>
//                       Update your bank account details for withdrawals.
//                     </DialogDescription>
//                   </DialogHeader>

//                   <div className="grid gap-4 mt-2">
//                     <div className="grid gap-2">
//                       <Label>Bank</Label>
//                       <Select
//                         value={bankCode}
//                         onValueChange={(code) => setBankCode(code)}
//                       >
//                         <SelectTrigger className="w-full">
//                           <SelectValue
//                             placeholder={
//                               isLoadingBanks
//                                 ? "Loading banks..."
//                                 : "Select a bank"
//                             }
//                           />
//                         </SelectTrigger>
//                         <SelectContent className="h-60">
//                           {banks?.banks?.map((bank: any) => (
//                             <SelectItem key={bank.id} value={bank.code}>
//                               {bank.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="grid gap-2">
//                       <Label>Account Number</Label>
//                       <Input
//                         type="text"
//                         placeholder="0123456789"
//                         maxLength={10}
//                         value={accountNumber}
//                         onChange={(e) => setAccountNumber(e.target.value)}
//                       />
//                     </div>

//                     {isLoadingAccountDetails && (
//                       <div className="flex items-center justify-center py-2">
//                         <Spinner />
//                       </div>
//                     )}

//                     {accountDetails && (
//                       <div className="grid gap-1 p-2 bg-gray-50 rounded border">
//                         <p className="text-sm">
//                           <strong>Account Name:</strong>{" "}
//                           {accountDetails?.data?.account_name}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Account Number:</strong>{" "}
//                           {accountDetails?.data?.account_number}
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   <DialogFooter className="flex flex-col sm:flex-row gap-2">
//                     <DialogClose asChild>
//                       <Button variant="outline" className="w-full sm:w-auto">
//                         Cancel
//                       </Button>
//                     </DialogClose>
//                     <Button
//                       type="submit"
//                       disabled={updateWalletMutation.isLoading}
//                       className="w-full sm:w-auto"
//                     >
//                       {updateWalletMutation.isLoading
//                         ? "Updating..."
//                         : "Update"}
//                     </Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>

//         {/* BALANCE CARD */}
//         <div className="rounded-2xl shadow p-6 w-full md:w-64 bg-white text-center">
//           <h2 className="text-sm text-gray-600">Available Balance</h2>
//           <p className="text-3xl font-bold mt-1">{formatNaira(balance)}</p>
//         </div>
//       </div>

//       {/* WALLET DETAILS CARD */}
//       <div className="bg-white shadow rounded-xl p-6 sm:p-8 overflow-x-auto">
//         <h2 className="text-xl font-semibold mb-6">Wallet Details</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
//           <div>
//             <p className="text-gray-600">Account Name:</p>
//             <p className="font-medium">{wallet.bankAccountName ?? "—"}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Bank Name:</p>
//             <p className="font-medium">{wallet.bankName ?? "—"}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Account Number:</p>
//             <p className="font-medium">{wallet.bankAccountNumber ?? "—"}</p>
//           </div>
//         </div>
//       </div>

//       {/* RECENT TRANSACTIONS */}
//       <div className="bg-white shadow rounded-xl p-6 sm:p-8 overflow-x-auto">
//         <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
//         {transactions.length === 0 ? (
//           <div className="text-sm text-gray-600">No transactions yet</div>
//         ) : (
//           <table className="w-full text-left min-w-[600px]">
//             <thead>
//               <tr className="border-b">
//                 <th className="pb-3">Type</th>
//                 <th className="pb-3">Amount</th>
//                 <th className="pb-3">Status</th>
//                 <th className="pb-3">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((txn: any) => {
//                 const status = (txn.status || "").toLowerCase();
//                 const badgeClass =
//                   status === "successful"
//                     ? "bg-green-100 text-green-700"
//                     : status === "pending"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-red-100 text-red-700";

//                 const created = txn.createdAt ? new Date(txn.createdAt) : null;
//                 const dateText = created
//                   ? created.toISOString().split("T")[0]
//                   : "--";

//                 return (
//                   <tr
//                     key={txn._id ?? txn.id}
//                     className="border-b last:border-none"
//                   >
//                     <td className="py-3">
//                       {txn.type ?? txn.transactionType ?? "—"}
//                     </td>
//                     <td className="py-3 font-medium">
//                       {formatNaira(txn.amount)}
//                     </td>
//                     <td className="py-3">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs ${badgeClass}`}
//                       >
//                         {txn.status ?? "—"}
//                       </span>
//                     </td>
//                     <td className="py-3">{dateText}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Wallet;

// import { walletService } from "@/api/wallet.api";
// import { WalletTransactionsTable } from "./WalletTransaction";
// import { Spinner } from "@/components/custom/loader";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { toast } from "sonner";

// function Wallet() {
//   const [amount, setAmount] = useState<number>(0);
//   const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
//   const [bankCode, setBankCode] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const queryClient = useQueryClient();

//   const createTopUpMutation = useMutation({
//     mutationFn: (amt: any) => walletService.topUpWallet(amt),
//     onSuccess: (res: any) => {
//       const redirectUrl = res?.authorization_url;
//       if (redirectUrl) window.location.href = redirectUrl;
//       else toast.error("Unable to start payment. Try again.");
//     },
//     onError: (error: any) => toast.error(error?.message || "Top up failed"),
//   });

//   const withdrawMutation = useMutation({
//     mutationFn: (amt: any) => walletService.withdrawFunds(amt),
//     onSuccess: () => {
//       toast.success("Withdrawal request submitted!");
//       queryClient.invalidateQueries({ queryKey: ["wallet"] });
//     },
//     onError: (error: any) => toast.error(error?.message || "Withdraw failed"),
//   });

//   const updateWalletMutation = useMutation({
//     mutationFn: (payload: any) => walletService.updateWalletDetails(payload),
//     onSuccess: () => {
//       toast.success("Wallet details updated");
//       queryClient.invalidateQueries({ queryKey: ["wallet"] });
//     },
//     onError: (error: any) => toast.error(error?.message || "Update failed"),
//   });

//   const { data, isLoading } = useQuery({
//     queryKey: ["wallet"],
//     queryFn: () => walletService.getUserWallet(),
//   });

//   const { data: banks, isLoading: isLoadingBanks } = useQuery({
//     queryKey: ["banks"],
//     queryFn: () => walletService.getBanks(),
//   });

//   const { data: accountDetails, isLoading: isLoadingAccountDetails } = useQuery(
//     {
//       queryKey: ["accountDetails", bankCode, accountNumber],
//       queryFn: () => walletService.verifyAccountNumber(bankCode, accountNumber),
//       enabled: accountNumber.length === 10 && !!bankCode,
//       retry: false,
//     }
//   );

//   if (isLoading) return <Spinner />;

//   const wallet = data?.wallet ?? {};
//   const balance = typeof wallet.balance === "number" ? wallet.balance : 0;
//   const transactions: any[] = Array.isArray(wallet.transactions)
//     ? wallet.transactions
//     : [];

//   const formatNaira = (n: number) => `₦${Number(n || 0).toLocaleString()}`;

//   return (
//     <div className="space-y-5">
//       <h1 className="text-3xl font-semibold text-center">Your Wallet</h1>

//       {/* ACTIONS + BALANCE */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//         <div className="w-full md:w-3/5">
//           <div className="flex flex-col sm:flex-row gap-4 mt-6">
//             {/* TOP UP */}
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="bg-green-700 hover:bg-green-800 px-6 py-2 rounded-lg text-white w-full sm:w-auto">
//                   Top Up
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="w-full sm:max-w-[425px]">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     if (!amount || amount <= 0) {
//                       toast.error("Enter a valid amount");
//                       return;
//                     }
//                     createTopUpMutation.mutateAsync(amount);
//                   }}
//                 >
//                   <DialogHeader>
//                     <DialogTitle>Top Up Wallet</DialogTitle>
//                     <DialogDescription>
//                       Add funds to your wallet by entering an amount below.
//                     </DialogDescription>
//                   </DialogHeader>

//                   <div className="grid gap-4 mt-2">
//                     <div className="grid gap-3">
//                       <Label htmlFor="amount">Amount</Label>
//                       <Input
//                         id="amount"
//                         type="number"
//                         min={1}
//                         onChange={(e) => setAmount(Number(e.target.value))}
//                         value={amount || ""}
//                       />
//                     </div>
//                   </div>

//                   <DialogFooter className="flex flex-col sm:flex-row gap-2">
//                     <DialogClose asChild>
//                       <Button variant="outline" className="w-full sm:w-auto">
//                         Cancel
//                       </Button>
//                     </DialogClose>
//                     <Button
//                       type="submit"
//                       disabled={createTopUpMutation.isLoading}
//                       className="w-full sm:w-auto"
//                     >
//                       {createTopUpMutation.isLoading
//                         ? "Processing..."
//                         : "Top Up"}
//                     </Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>

//             {/* WITHDRAW */}
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg text-white w-full sm:w-auto">
//                   Withdraw
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="w-full sm:max-w-[425px]">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     if (!withdrawAmount || withdrawAmount <= 0) {
//                       toast.error("Enter a valid withdrawal amount");
//                       return;
//                     }
//                     withdrawMutation.mutateAsync(withdrawAmount);
//                   }}
//                 >
//                   <DialogHeader>
//                     <DialogTitle>Withdraw Funds</DialogTitle>
//                     <DialogDescription>
//                       Enter the amount you want to withdraw.
//                     </DialogDescription>
//                   </DialogHeader>

//                   <div className="grid gap-4 mt-2">
//                     <div className="grid gap-3">
//                       <Label htmlFor="withdraw">Withdraw Amount</Label>
//                       <Input
//                         id="withdraw"
//                         type="number"
//                         min={1}
//                         onChange={(e) =>
//                           setWithdrawAmount(Number(e.target.value))
//                         }
//                         value={withdrawAmount || ""}
//                       />
//                     </div>
//                   </div>

//                   <DialogFooter className="flex flex-col sm:flex-row gap-2">
//                     <DialogClose asChild>
//                       <Button variant="outline" className="w-full sm:w-auto">
//                         Cancel
//                       </Button>
//                     </DialogClose>
//                     <Button
//                       type="submit"
//                       disabled={withdrawMutation.isLoading}
//                       className="w-full sm:w-auto"
//                     >
//                       {withdrawMutation.isLoading
//                         ? "Submitting..."
//                         : "Withdraw"}
//                     </Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>

//             {/* UPDATE DETAILS */}
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white w-full sm:w-auto">
//                   Update Details
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="w-full sm:max-w-[425px]">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     if (!bankCode || accountNumber.length !== 10) {
//                       toast.error(
//                         "Select a bank and enter a 10-digit account number"
//                       );
//                       return;
//                     }
//                     updateWalletMutation.mutateAsync({
//                       accountNumber,
//                       bankCode,
//                     });
//                   }}
//                 >
//                   <DialogHeader>
//                     <DialogTitle>Update Wallet Details</DialogTitle>
//                     <DialogDescription>
//                       Update your bank account details for withdrawals.
//                     </DialogDescription>
//                   </DialogHeader>

//                   <div className="grid gap-4 mt-2">
//                     <div className="grid gap-2">
//                       <Label>Bank</Label>
//                       <Select
//                         value={bankCode}
//                         onValueChange={(code) => setBankCode(code)}
//                       >
//                         <SelectTrigger className="w-full">
//                           <SelectValue
//                             placeholder={
//                               isLoadingBanks
//                                 ? "Loading banks..."
//                                 : "Select a bank"
//                             }
//                           />
//                         </SelectTrigger>
//                         <SelectContent className="h-60">
//                           {banks?.banks?.map((bank: any) => (
//                             <SelectItem key={bank.id} value={bank.code}>
//                               {bank.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="grid gap-2">
//                       <Label>Account Number</Label>
//                       <Input
//                         type="text"
//                         placeholder="0123456789"
//                         maxLength={10}
//                         value={accountNumber}
//                         onChange={(e) => setAccountNumber(e.target.value)}
//                       />
//                     </div>

//                     {isLoadingAccountDetails && (
//                       <div className="flex items-center justify-center py-2">
//                         <Spinner />
//                       </div>
//                     )}

//                     {accountDetails && (
//                       <div className="grid gap-1 p-2 bg-gray-50 rounded border">
//                         <p className="text-sm">
//                           <strong>Account Name:</strong>{" "}
//                           {accountDetails?.data?.account_name}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Account Number:</strong>{" "}
//                           {accountDetails?.data?.account_number}
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   <DialogFooter className="flex flex-col sm:flex-row gap-2">
//                     <DialogClose asChild>
//                       <Button variant="outline" className="w-full sm:w-auto">
//                         Cancel
//                       </Button>
//                     </DialogClose>
//                     <Button
//                       type="submit"
//                       disabled={updateWalletMutation.isLoading}
//                       className="w-full sm:w-auto"
//                     >
//                       {updateWalletMutation.isLoading
//                         ? "Updating..."
//                         : "Update"}
//                     </Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>

//         {/* BALANCE CARD */}
//         <div className="rounded-2xl shadow p-6 w-full md:w-64 bg-white text-center">
//           <h2 className="text-sm text-gray-600">Available Balance</h2>
//           <p className="text-3xl font-bold mt-1">{formatNaira(balance)}</p>
//         </div>
//       </div>

//       {/* WALLET DETAILS CARD */}
//       <div className="bg-white shadow rounded-xl p-6 sm:p-8 overflow-x-auto">
//         <h2 className="text-xl font-semibold mb-6">Wallet Details</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
//           <div>
//             <p className="text-gray-600">Account Name:</p>
//             <p className="font-medium">{wallet.bankAccountName ?? "—"}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Bank Name:</p>
//             <p className="font-medium">{wallet.bankName ?? "—"}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Account Number:</p>
//             <p className="font-medium">{wallet.bankAccountNumber ?? "—"}</p>
//           </div>
//         </div>
//       </div>

//       {/* RECENT TRANSACTIONS */}
//       <div className="bg-white shadow rounded-xl p-6 sm:p-8 overflow-x-auto">
//         <h2 className="text-xl font-semibold mb-6">History</h2>
//         <WalletTransactionsTable transactions={transactions} />
//       </div>
//     </div>
//   );
// }

// export default Wallet;

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

  // Sample transactions data matching the Figma design
  const transactions: any[] =
    Array.isArray(wallet.transactions) && wallet.transactions.length > 0
      ? wallet.transactions
      : [
          {
            id: 1,
            date: "Aug 01, 2025",
            propertyName: "1004 Estate",
            location: "Lekki Phase 1",
            amount: 50000,
            status: "Paid",
          },
          {
            id: 2,
            date: "Aug 01, 2025",
            propertyName: "1004 Estate",
            location: "Lekki Phase 1",
            amount: 50000,
            status: "Pending",
          },
          {
            id: 3,
            date: "Aug 01, 2025",
            propertyName: "1004 Estate",
            location: "Lekki Phase 1",
            amount: 50000,
            status: "Pending",
          },
          {
            id: 4,
            date: "Aug 01, 2025",
            propertyName: "1004 Estate",
            location: "Lekki Phase 1",
            amount: 50000,
            status: "Paid",
          },
          {
            id: 5,
            date: "Aug 01, 2025",
            propertyName: "1004 Estate",
            location: "Lekki Phase 1",
            amount: 50000,
            status: "Cancelled",
          },
        ];

  const formatNaira = (n: number) => `₦${Number(n || 0).toLocaleString()}`;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Your Wallet</h1>
      </div>

      {/* Balance Card & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-sm font-medium text-gray-600 mb-2">
              Available balance
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">₦</span>
              <p className="text-5xl font-bold text-gray-900">
                {Number(balance || 45000).toLocaleString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg text-white font-medium text-base">
                    Top Up
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

                    <div className="grid gap-4 mt-2">
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

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
                      <DialogClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        disabled={createTopUpMutation.isLoading}
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                      >
                        {createTopUpMutation.isLoading
                          ? "Processing..."
                          : "Top Up"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg text-white font-medium text-base">
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

                    <div className="grid gap-4 mt-2">
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

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
                      <DialogClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        disabled={withdrawMutation.isLoading}
                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600"
                      >
                        {withdrawMutation.isLoading
                          ? "Submitting..."
                          : "Withdraw"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-white font-medium text-base">
                    Update Details
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
                      updateWalletMutation.mutateAsync({
                        accountNumber,
                        bankCode,
                      });
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle>Update Wallet Details</DialogTitle>
                      <DialogDescription>
                        Update your bank account details for withdrawals.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 mt-2">
                      <div className="grid gap-2">
                        <Label>Bank</Label>
                        <Select
                          value={bankCode}
                          onValueChange={(code) => setBankCode(code)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                isLoadingBanks
                                  ? "Loading banks..."
                                  : "Select a bank"
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
                          type="text"
                          placeholder="0123456789"
                          maxLength={10}
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                        />
                      </div>

                      {isLoadingAccountDetails && (
                        <div className="flex items-center justify-center py-2">
                          <Spinner />
                        </div>
                      )}

                      {accountDetails && (
                        <div className="grid gap-1 p-2 bg-gray-50 rounded border">
                          <p className="text-sm">
                            <strong>Account Name:</strong>{" "}
                            {accountDetails?.data?.account_name}
                          </p>
                          <p className="text-sm">
                            <strong>Account Number:</strong>{" "}
                            {accountDetails?.data?.account_number}
                          </p>
                        </div>
                      )}
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
                      <DialogClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        disabled={updateWalletMutation.isLoading}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                      >
                        {updateWalletMutation.isLoading
                          ? "Updating..."
                          : "Update"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Wallet Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Wallet Details
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Account Name</p>
              <p className="text-base font-medium text-gray-900">
                {wallet.bankAccountName || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Bank Name</p>
              <p className="text-base font-medium text-gray-900">
                {wallet.bankName || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Account Number</p>
              <p className="text-base font-medium text-gray-900">
                {wallet.bankAccountNumber || "Not set"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">History</h2>
        <WalletTransactionsTable transactions={transactions} />
      </div>
    </div>
  );
}

export default Wallet;
