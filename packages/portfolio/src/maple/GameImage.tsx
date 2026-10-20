import { gameImages } from "./data/images";

/** Locally bundled game art. Adjacent labels provide the accessible name. */
export function GameImage({
  name,
  className = "",
  decorative = true,
}: {
  name: string;
  className?: string;
  decorative?: boolean;
}) {
  const image = gameImages[name];
  if (!image) return null;
  return (
    <img
      className={`game-image ${className}`}
      src={image.src}
      width={image.width}
      height={image.height}
      alt={decorative ? "" : `${name} game artwork`}
      title={name}
      loading="lazy"
      decoding="async"
    />
  );
}
