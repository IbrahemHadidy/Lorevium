import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground mx-auto flex min-h-screen w-full flex-col items-center">
      <Header />
      <main className="mb-8 flex w-full max-w-[1550px] flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
