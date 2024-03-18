import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getXpYear() {
  const startYear = 2007;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}

export function compactName(name: string): string {
  if (name.length > 20) {
    const nameArray = name.split(" ");
    return `${nameArray[0]} ${nameArray[nameArray.length - 1]}`;
  }
  return name;
}

export function generateGravatarHash(email: string): string {
  return crypto
    .createHash("sha256")
    .update(email.trim().toLowerCase())
    .digest("hex");
}

export function capitalizeString(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    return "";
  }

  const words = str.split(" ");

  const capitalized = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return "";
    }
  });

  return capitalized.join(" ");
}
