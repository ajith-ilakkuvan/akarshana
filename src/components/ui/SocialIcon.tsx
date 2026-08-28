/**
 * Lucide dropped brand/social glyphs, so these three are small inline SVGs
 * instead — kept minimal on purpose rather than pulling in an icon pack
 * just for three logos.
 */
const paths: Record<"instagram" | "facebook" | "youtube", string> = {
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.25-3.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z",
  facebook:
    "M13.5 21v-7.5H16l.5-3.5h-3V7.7c0-1 .3-1.7 1.7-1.7H16.5V2.8C16 2.7 15 2.6 13.9 2.6c-2.4 0-4.1 1.5-4.1 4.2V10H7v3.5h2.8V21h3.7Z",
  youtube:
    "M21.6 7.6a2.5 2.5 0 0 0-1.8-1.8C18.1 5.3 12 5.3 12 5.3s-6.1 0-7.8.5A2.5 2.5 0 0 0 2.4 7.6 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.4 2.5 2.5 0 0 0 1.8 1.8c1.7.5 7.8.5 7.8.5s6.1 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z",
};

export function SocialIcon({
  platform,
  className,
}: {
  platform: "instagram" | "facebook" | "youtube";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={paths[platform]} />
    </svg>
  );
}
