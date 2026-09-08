import { Star, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealGroup } from "@/components/ui/Reveal";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { cn } from "@/lib/utils";
import { reviews as placeholderReviews, averageRating, placeholderReviewCount } from "@/config/reviews";
import { fetchAllBranchReviews } from "@/lib/googlePlaces";

const avatarStyles = [
  "bg-brand-gold-light text-brand-gold-dark",
  "bg-brand-red-light/15 text-brand-red",
  "bg-charcoal/10 text-charcoal",
  "bg-brand-gold/20 text-brand-gold-dark",
];

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function StarRow({ rating, size = "size-4", className }: { rating: number; size?: string; className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(size, index < Math.round(rating) ? "fill-brand-gold text-brand-gold" : "text-charcoal/15")}
        />
      ))}
    </span>
  );
}

export async function ReviewsSection() {
  const { reviews: liveReviews, sources } = await fetchAllBranchReviews();
  const isLive = liveReviews.length > 0;
  const items = isLive ? liveReviews : placeholderReviews;
  const rating = averageRating(items);
  const mapsLink = sources.find((source) => source.googleMapsUri)?.googleMapsUri;
  const reviewCount = isLive
    ? sources.reduce((sum, source) => sum + source.userRatingCount, 0)
    : placeholderReviewCount;

  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <GoogleIcon className="size-9 shrink-0" />
            <div>
              <h2 className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">Google Reviews</h2>
              <p className="text-sm text-charcoal/60">
                {isLive ? (
                  <>
                    What our customers are saying
                    {mapsLink && (
                      <>
                        {" "}
                        —{" "}
                        <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-red hover:underline">
                          see all reviews on Google
                        </a>
                      </>
                    )}
                  </>
                ) : (
                  "What our customers are saying"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-charcoal/10 bg-white px-4 py-2 shadow-sm">
            <span className="font-display text-lg font-bold text-charcoal">{rating.toFixed(1)}</span>
            <StarRow rating={rating} />
            <span className="text-sm text-charcoal/60">{reviewCount}+ reviews</span>
          </div>
        </div>

        <RevealGroup
          variant="fade-up"
          staggerMs={80}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              className="flex flex-col rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold",
                      avatarStyles[index % avatarStyles.length],
                    )}
                  >
                    {initials(review.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{review.name}</p>
                    <p className="flex items-center gap-1 text-xs text-charcoal/50">
                      <MapPin aria-hidden="true" className="size-3" />
                      {review.location}
                      {review.time && <span> · {review.time}</span>}
                    </p>
                  </div>
                </div>
                <GoogleIcon className="size-4 shrink-0" />
              </div>
              <StarRow rating={review.rating} size="size-3.5" className="mt-3" />
              <p className="mt-3 text-sm text-charcoal/70">{review.text}</p>
            </article>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
