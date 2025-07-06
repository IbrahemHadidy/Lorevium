import { cn } from '@/lib/utils/cn';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans = Source_Sans_3({ weight: '700', subsets: ['latin'] });

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1 70"
      width="150"
      height="60"
      role="img"
      aria-label="Lorevium logo"
      className={cn(sourceSans.className, className)}
      fill="currentColor"
    >
      <text x="50%" y="50%" fontSize="40" textAnchor="middle" dominantBaseline="middle">
        Lorevium
      </text>
    </svg>
  );
}
