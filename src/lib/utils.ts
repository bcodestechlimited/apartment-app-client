import type { ShareOptions } from "@/interfaces/shareOptions";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleAxiosError = (
  error: any,
  alternateMessage?: string,
): string => {
  if (!error) {
    throw new Error("An unknown error occurred");
  }

  if (error instanceof AxiosError && error.response?.status === 422) {
    throw new Error(
      error.response?.data?.errors[0].message || alternateMessage,
    );
  }
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.message || alternateMessage);
  }
  throw error;
};

export const formatDate = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return new Date(date).toLocaleDateString("en-CA", options);
};

export function formatPrettyDate(dateString: string) {
  if (!dateString) return " - ";

  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const date = new Date(dateString);

  const day = date.getDate();
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  return `${dayWithSuffix} ${monthName} ${year}`;
}

// export const formatCurrency = (amount: number | string): string => {
//   const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   }).format(parsedAmount);
// };

export const formatCurrency = (
  amount: number | string | undefined | null,
): string => {
  if (amount === "" || amount === undefined || amount === null) {
    return "";
  }

  const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(parsedAmount)) {
    return "";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(parsedAmount);
};

export const getActualTypeFromParam = (type: string): string | undefined => {
  if (!type || type.toLowerCase() === "all") {
    return type;
  }

  const propertyTypes: Record<string, string> = {
    serviced: "serviced-apartment",
    shared: "shared-apartment",
    standard: "standard-rental",
    "short-let": "short-lets",
    "co-working-space": "co-working-space",
  };

  return propertyTypes[type.toLowerCase()].replace("-", " ");
};

export async function downloadFile(url: string, fileName: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    window.open(url, "_blank");
  }
}

export const getUniversalPropertyUrl = (propertyId: string) => {
  return `${window.location.origin}/view/property/${propertyId}`;
};
