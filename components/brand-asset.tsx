import Image from 'next/image';

type BrandVariant = 'logo-primary' | 'logo-dark' | 'logo-light' | 'icon-app' | 'favicon' | 'os-badge';

export function BrandAsset({ variant, alt, className }: { variant: BrandVariant; alt: string; className?: string }) {
  return <Image src={`/assets/brand/${variant}.png`} alt={alt} width={160} height={48} className={className} />;
}
