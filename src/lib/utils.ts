import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleAxiosError = (
  error: any,
  alternateMessage?: string
): string => {
  console.log({ error: error.response?.data?.errors });

  if (!error) {
    throw new Error("An unknown error occurred");
  }

  if (error instanceof AxiosError && error.response?.status === 422) {
    throw new Error(
      error.response?.data?.errors[0].message || alternateMessage
    );
  }
  if (error instanceof AxiosError) {
    console.log(error?.response?.data);
    throw new Error(error.response?.data?.message || alternateMessage);
  }
  throw error;
};

// returns: MM/DD/YYYY (e.g., 06/19/2025)
export const formatDate = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return new Date(date)
    .toLocaleDateString("en-CA", options);
};

// returns: 19th June 2025
export function formatPrettyDate(dateString: string) {
  // Helper function to get the ordinal suffix

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

  // Create a Date object from the ISO 8601 string
  const date = new Date(dateString);

  const day = date.getDate();
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  return `${dayWithSuffix} ${monthName} ${year}`;
}

export const formatCurrency = (amount: number | string): string => {
  const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(parsedAmount);
  // return `N${num.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
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
