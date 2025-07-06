import { routing } from '@/lib/i18n/routing';
import ar from './src/locales/ar.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof ar;
  }
}
