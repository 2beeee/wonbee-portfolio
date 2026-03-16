import Image from "next/image";
import type { ProjectMedia } from "@/data/projects";

type MediaFrameProps = {
  media: ProjectMedia;
  compact?: boolean;
  priority?: boolean;
  className?: string;
};

const orientationClass: Record<NonNullable<ProjectMedia["orientation"]>, string> = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[9/16]",
  square: "aspect-square"
};

export function MediaFrame({ media, compact = false, priority = false, className = "" }: MediaFrameProps) {
  const ratio = orientationClass[media.orientation ?? "landscape"];

  return (
    <figure className={`space-y-2 ${className}`}>
      <div
        className={`relative overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-white shadow-sm ${ratio}`}
      >
        {media.type === "image" ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={compact ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 1024px) 100vw, 50vw"}
            className="object-contain p-1"
            priority={priority}
          />
        ) : (
          <video className="h-full w-full object-contain bg-neutral-900" controls preload="metadata" playsInline>
            <source src={media.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {!compact && media.caption ? <figcaption className="text-xs text-neutral-600">{media.caption}</figcaption> : null}
    </figure>
  );
}
