export const renderStatusBadge = (
  status: string,
  type: "status" | "payment"
) => {
  let classes = "font-medium text-center";
  let text = status;

  if (type === "status") {
    // Active, Pending, Cancelled styles for status badges
    if (status === "Active")
      classes += " text-emerald-600 bg-emerald-50 rounded-sm px-2 py-0.5";
    if (status === "Pending")
      classes += " text-amber-600 bg-amber-50 rounded-sm px-2 py-0.5";
    if (status === "Cancelled")
      classes += " text-red-600 bg-red-50 rounded-sm px-2 py-0.5";
  } else {
    // Cleared, Outstanding/Overdue, Refund issued styles for payment status
    if (status === "Cleared") classes += " text-emerald-600";
    if (status === "Outstanding" || status === "Overdue")
      classes += " text-red-600";
    if (status === "Refund issued") classes += " text-sky-600";
  }

  // Use inline-block to allow padding/background on status text
  return <div className={`inline-block ${classes}`}>{text}</div>;
};

export const styles = {
  verified: "text-sm font-medium text-center text-emerald-600",
  pending: "text-sm font-medium text-center text-amber-600",
  failed: "bg-red-100 text-red-700",
};
