import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWallet(wallet: string) {
  return wallet.slice(0, 5) + "..." + wallet.slice(-12);
}
