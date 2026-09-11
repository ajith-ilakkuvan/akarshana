export interface RequiredDocument {
  title: string;
  description: string;
  icon: "pan" | "aadhaar" | "ration" | "bill";
}

/**
 * Documents customers should bring to the branch once they've decided to
 * sell — shown on the homepage and the /services/ page.
 */
export const requiredDocuments: RequiredDocument[] = [
  {
    title: "PAN Card",
    description: "Required for any single sale of ₹2 lakh and above.",
    icon: "pan",
  },
  {
    title: "Aadhaar Card",
    description: "For KYC verification and address proof.",
    icon: "aadhaar",
  },
  {
    title: "Ration Card",
    description: "Accepted as additional address and identity proof where needed.",
    icon: "ration",
  },
  {
    title: "Original Purchase Bill",
    description: "Optional — not mandatory; KYC alone is sufficient.",
    icon: "bill",
  },
];
