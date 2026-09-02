import Image from "next/image";
import { RevealGroup } from "@/components/ui/Reveal";

/**
 * Photo grid for a branch, shown under its map on that city's
 * `/gold-buyers-<city>/` page. Only rendered by the caller when
 * `location.branch.gallery` has entries — see LocationPageTemplate.
 */
export function LocationGallery({ photos }: { photos: { src: string; alt: string }[] }) {
  return (
    <RevealGroup variant="fade-up" staggerMs={80} className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {photos.map((photo, index) => (
        <div
          key={`${photo.src}-${index}`}
          className="relative aspect-square overflow-hidden rounded-2xl border border-charcoal/10 bg-cream"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </RevealGroup>
  );
}
