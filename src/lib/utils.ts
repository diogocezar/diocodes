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

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return { meta: { error: error.message } };
  return String(error);
}

export function transformMeta(data: Object) {
  return { meta: data };
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
