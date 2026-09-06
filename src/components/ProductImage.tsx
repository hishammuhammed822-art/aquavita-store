import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

const PLACEHOLDER_SVG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#0f1e2e"/><text x="200" y="155" font-size="14" fill="#4a5d6e" text-anchor="middle" font-family="sans-serif">No Image</text></svg>`,
  );

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className: string;
  loading?: 'lazy' | 'eager';
}

export function ProductImage({ src, alt, className, loading }: ProductImageProps) {
  const [errored, setErrored] = useState(false);
  const imageSrc = !src || errored ? PLACEHOLDER_SVG : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setErrored(true)}
    />
  );
}
