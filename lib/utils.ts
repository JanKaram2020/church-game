import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getRandomId = (v?: number | string) =>
  Math.random().toString(36).substring(2, 5) + v;
export const getNNumbers = (n: number) =>
  Array.from({ length: n }, (_, i) => i + 1);
