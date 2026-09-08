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
  {
    text: "உங்கள் தங்க நகைகளை ஆன்லைன் விலையில் விற்பதற்கும், அடகு மற்றும் ஏல நகைகளை மீட்பதற்கும் அணுகவும். ஆகர்ஷனா கோல்டு கம்பெனி",
    lang: "ta",
  },
  { text: "பொள்ளாச்சி • உடுமலைப்பேட்டை • கோயம்புத்தூர் • திருப்பூர்", lang: "ta" },
];
