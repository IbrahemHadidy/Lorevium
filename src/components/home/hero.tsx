'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { useAppSelector } from '@/lib/store';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import heroBg from '@/assets/hero-bg.webp';

export default function Hero() {
  const t = useTranslations('Home');
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 h-screen w-screen">
        <Image
          src={heroBg}
          alt="Hero Background"
          fill
          className="object-cover"
          quality={75}
          priority
        />
        <div className="bg-background/50 absolute inset-0" />
      </div>

      {/* Content */}
      <div className="text-foreground relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold lg:text-6xl">{t('Hero.title')}</h1>
        <p className="mt-4 max-w-2xl text-lg lg:text-xl">{t('Hero.subtitle')}</p>
        <Link href={user ? '/lessons' : '/login'}>
          <Button className="mt-6" variant="outline">
            {t('Hero.cta')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
