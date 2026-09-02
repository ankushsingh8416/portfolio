import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Joins class names and resolves conflicting Tailwind utilities (standard shadcn helper). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
