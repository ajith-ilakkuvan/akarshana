import { contactConfig } from "@/config/contact";

export interface CareerOpening {
  slug: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  icon: "coins" | "users" | "truck" | "store";
}

export const careerOpenings: CareerOpening[] = [
  {
    slug: "gold-valuation-executive",
    title: "Gold Valuation Executive",
    location: "Pollachi",
    type: "Full-Time",
    summary: "Assess gold purity and weight for walk-in customers and explain valuations clearly and transparently.",
    responsibilities: [
      "Check gold purity and weight as part of the branch's valuation process",
      "Explain the valuation and applicable market rate to customers in clear terms",
      "Maintain accurate records of daily valuations and transactions",
      "Follow the branch's security and handling procedures at all times",
    ],
    requirements: [
      "Prior experience in gold valuation, jewellery retail or a related field preferred",
      "Strong attention to detail and comfort working with precision instruments",
      "Good communication skills in Tamil and English",
    ],
    icon: "coins",
  },
  {
    slug: "customer-relationship-executive",
    title: "Customer Relationship Executive",
    location: "Udumalpet",
    type: "Full-Time",
    summary: "Be the first point of contact for customers, over the phone and in person, and coordinate their gold valuation visits.",
    responsibilities: [
      "Handle walk-in and phone enquiries about gold valuation and other services",
      "Coordinate appointments and doorstep service requests with the branch team",
      "Follow up with leads and keep customer records up to date",
      "Represent Akarshana Gold professionally in every customer interaction",
    ],
    requirements: [
      "Prior experience in customer service or sales is an advantage",
      "Comfortable with phone-based follow-ups and basic record-keeping",
      "Good communication skills in Tamil and English",
    ],
    icon: "users",
  },
  {
    slug: "doorstep-service-executive",
    title: "Doorstep Service Executive",
    location: "Coimbatore",
    type: "Full-Time",
    summary: "Travel to customers' homes to support doorstep gold valuation visits, coordinating closely with the branch team.",
    responsibilities: [
      "Visit customers at their requested location for doorstep valuation appointments",
      "Coordinate timing and logistics with the branch and the customer",
      "Follow all security and handling procedures during doorstep visits",
      "Provide a courteous, professional experience representing the brand",
    ],
    requirements: [
      "Valid two-wheeler license and willingness to travel within the service area",
      "Trustworthy, punctual and comfortable working independently",
      "Good communication skills in Tamil and English",
    ],
    icon: "truck",
  },
  {
    slug: "branch-sales-associate",
    title: "Branch Sales Associate",
    location: "Tiruppur",
    type: "Full-Time",
    summary: "Support day-to-day branch operations and help customers through the gold valuation and selling process.",
    responsibilities: [
      "Assist customers at the branch through the valuation and service process",
      "Support daily branch operations, including record-keeping and upkeep",
      "Work with the team to meet branch service standards",
      "Escalate queries appropriately and maintain customer trust",
    ],
    requirements: [
      "Prior experience in retail, sales or a customer-facing role preferred",
      "Comfortable working in a fast-paced branch environment",
      "Good communication skills in Tamil and English",
    ],
    icon: "store",
  },
];

export function getCareerBySlug(slug: string): CareerOpening | undefined {
  return careerOpenings.find((opening) => opening.slug === slug);
}

/**
 * `mailto:` link pre-filled with a subject naming the role being applied
 * for. Built with `encodeURIComponent` rather than `URLSearchParams` —
 * the latter encodes spaces as `+`, which is correct for form bodies but
 * not for a `mailto:` URI, where mail clients expect `%20`.
 */
export function careerApplyHref(jobTitle: string): string {
  const subject = encodeURIComponent(`Application: ${jobTitle}`);
  const body = encodeURIComponent(
    `Hi Akarshana Gold,\n\nI would like to apply for the ${jobTitle} position.\n\nName:\nLocation:\nExperience:\nPhone number:\n`,
  );
  return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
}
