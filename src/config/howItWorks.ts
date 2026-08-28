export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const howItWorksSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Share / Bring Your Gold",
    description: "Visit a branch, or share your gold details with us to begin the process.",
  },
  {
    step: "02",
    title: "Purity Check",
    description: "Your gold's purity is assessed as part of a professional evaluation process.",
  },
  {
    step: "03",
    title: "Weight Verification",
    description: "The exact weight of your gold is verified before valuation.",
  },
  {
    step: "04",
    title: "Valuation Based on Applicable Rate",
    description: "Your gold is valued using the applicable current gold market rate.",
  },
  {
    step: "05",
    title: "Payment / Next Step",
    description: "Once you're satisfied with the valuation, we proceed to the next step with you.",
  },
];
