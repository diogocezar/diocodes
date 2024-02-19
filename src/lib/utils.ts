import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getXpYear() {
  const startYear = 2007;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}
