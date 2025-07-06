'use client';

import { Logo } from '@/components/layout/logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { mainApi } from '@/lib/api/main-api';
import { Role } from '@/lib/enums/role';
import { clearUser } from '@/lib/features/auth/auth.slice';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { cn } from '@/lib/utils/cn';
import { ChevronDown, LogOut, MenuIcon, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DisplayModeSelector } from './display-mode-selector';
import { LanguageSelector } from './language-selector';

export function Header() {
  const pathname = usePathname();
  const t = useTranslations('Layout.Header');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    dispatch(mainApi.util.resetApiState());
  };

  const navLinks = [
    ...(user?.role === Role.ADMIN ? [{ href: '/admin', label: t('adminPanel') }] : []),
    ...(user?.role === Role.SUPER_ADMIN ? [{ href: '/super-admin', label: t('adminPanel') }] : []),
    ...(user?.role !== Role.SUPER_ADMIN ? [{ href: '/lessons', label: t('lessons') }] : []),
    ...(user?.role !== Role.SUPER_ADMIN ? [{ href: '/exams', label: t('exams') }] : []),
  ];

  return (
    <header className="bg-background/70 sticky top-0 z-50 mb-1 w-full shadow-md backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-[1550px] items-center justify-between p-4 md:p-0">
        <div className="flex items-center gap-10 md:gap-20">
          {/* Left: Logo */}
          <Link href="/" aria-label="Homepage">
            <Logo />
          </Link>

          {/* Middle: Desktop nav */}
          <nav className="hidden items-center gap-4 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="group text-md relative font-medium">
                <span
                  className={cn('group-hover:text-primary', pathname === href && 'text-primary')}
                >
                  {label}
                </span>
                <span
                  className={cn(
                    'bg-primary absolute -bottom-0.5 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full',
                    pathname === href && 'w-full'
                  )}
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Middle: Mobile hamburger menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col gap-4 p-6">
            {/* Nav links */}
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm font-medium',
                  pathname === href && 'text-primary font-semibold underline'
                )}
              >
                {label}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-border my-2 border-t" />

            {/* User info - Mobile */}
            {user && (
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.fullName}</span>
                  <span className="text-muted-foreground text-xs">{user.email}</span>
                </div>

                <Button variant="ghost" size="icon">
                  {user.role !== Role.SUPER_ADMIN && (
                    <Link href="/profile-settings" className="flex flex-col">
                      <Settings />
                    </Link>
                  )}
                </Button>
              </div>
            )}

            {/* Logout button */}
            {user ? (
              <Button variant="destructive" onClick={handleLogout} className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                {t('logout')}
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    {t('signIn')}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full">{t('signUp')}</Button>
                </Link>
              </div>
            )}

            {/* Divider */}
            <div className="border-border my-2 border-t" />

            {/* Controls */}
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <DisplayModeSelector />
            </div>
          </SheetContent>
        </Sheet>

        {/* Right: Desktop user info with DropdownMenu + logout + controls */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSelector />
          <DisplayModeSelector />

          <div className="bg-border h-10 w-[1px]" />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-between"
                  aria-label="User menu"
                >
                  <span className="text-sm font-semibold">{user.fullName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="flex flex-row items-center gap-2">
                  <Avatar className="me-2 h-4 w-4">
                    <AvatarFallback>{user.fullName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-start">
                    <span className="text-sm font-semibold">{user.fullName}</span>
                    <span className="text-muted-foreground text-xs">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role !== Role.SUPER_ADMIN && (
                  <DropdownMenuItem asChild>
                    <Settings className="me-2 h-4 w-4" />
                    <Link href="/profile-settings" className="cursor-default">
                      {t('settings')}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="me-2 h-4 w-4" />
                  <span>{t('logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  {t('signIn')}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">{t('signUp')}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function AuthHeader() {
  return (
    <header className="absolute top-4 flex w-full max-w-[90%] items-center justify-between lg:w-full">
      <Link href="/" aria-label="Homepage">
        <Logo className="h-8 md:h-10" />
      </Link>

      <div className="flex items-center gap-2 md:gap-4">
        <LanguageSelector />
        <DisplayModeSelector />
      </div>
    </header>
  );
}
