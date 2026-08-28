type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Small className combinator — avoids pulling in clsx/tailwind-merge for this. */
export function cn(...values: ClassValue[]): string {
  const flat: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      flat.push(cn(...value));
    } else {
      flat.push(String(value));
    }
  }
  return flat.filter(Boolean).join(" ");
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUpdatedAt(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(date);
}
