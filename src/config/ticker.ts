/**
 * Content for the header's top-bar ticker — a continuously scrolling
 * strip of short announcements. Mixed Tamil/English so each item is
 * tagged with its script for the right font/color treatment.
 */
export interface TickerItem {
  text: string;
  lang: "ta" | "en";
}

export const tickerItems: TickerItem[] = [
  { text: "பழைய தங்கத்திற்கு அன்றைய சந்தை விலை", lang: "ta" },
  { text: "உங்கள் பழைய தங்கத்தை விற்று உடனடி பணம் பெறுங்கள்", lang: "ta" },
  { text: "Pollachi • Udumalpet • Coimbatore • Tiruppur", lang: "en" },
  { text: "உங்கள் இல்லம் தேடி வரும் சேவை", lang: "ta" },
];
