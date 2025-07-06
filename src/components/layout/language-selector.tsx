'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { routing } from '@/lib/i18n/routing';
import { ChevronDown, Languages } from 'lucide-react';
import { useLocale, type Locale } from 'next-intl';
import { Button } from '../ui/button';

export function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { locales, defaultLocale } = routing;

  const changeLocale = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale });
  };

  const localeNames: Record<Locale, string> = {
    en: 'English',
    ar: 'العربية',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label="Select language">
          <div className="flex items-center">
            <Languages className="me-2 h-4 w-4" />
            <span>{localeNames[locale] || localeNames[defaultLocale]}</span>
          </div>
          <ChevronDown className="ms-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[128px]">
        {locales.map((loc) => (
          <DropdownMenuItem key={loc} onSelect={() => changeLocale(loc)}>
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
