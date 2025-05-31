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
