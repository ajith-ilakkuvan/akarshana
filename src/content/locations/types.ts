import type { FaqEntry } from "@/config/faq";

/**
 * Shape every location content file must follow. Each file in this folder
 * is genuinely unique copy for that city — the page template in
 * `src/app/gold-buyers-[city]/page.tsx` is shared, but the words are not.
 */
export interface LocationContent {
  intro: string[];
  sellGold: string;
  pledgedGoldRelease: string;
  doorstepService: string;
  whyChoose: string[];
  faqs: FaqEntry[];
}
