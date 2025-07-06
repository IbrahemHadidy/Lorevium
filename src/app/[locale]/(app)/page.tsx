import Hero from '@/components/home/hero';
import generatePageMetadata from '@/lib/utils/generate-page-metadata';
import { type Locale } from 'next-intl';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return generatePageMetadata({
    locale,
    namespace: 'Metadata.Home',
    path: '/',
  });
}

export default function HomePage() {
  return <Hero />;
}
