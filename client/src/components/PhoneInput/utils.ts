import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ObjectDiff(newObj: any, oldObj: any) {
  if (Object.keys(oldObj).length == 0 && Object.keys(newObj).length > 0)
    return newObj;

  let diff: any = {};
  for (const key in oldObj) {
    if (newObj[key] && oldObj[key] != newObj[key]) {
      diff[key] = newObj[key];
    }
  }

  if (Object.keys(diff).length > 0) return diff;

  return null;
}