'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllUsersQuery } from '@/lib/api/endpoints/admin';
import { cn } from '@/lib/utils/cn';
import { AlertCircle, Loader2, Search, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

export default function AdminPage() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const t = useTranslations('AdminUsers');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers =
    data?.data?.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">{t('loading')}</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <AlertCircle className="text-destructive h-6 w-6" />
            <p className="text-destructive text-center">{t('errorLoadingUsers')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <p className="text-muted-foreground text-center">{t('noUsersFound')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="w-full flex-1">
      <h1 className="mb-4 ps-1 text-xl font-semibold">{t('title')}</h1>

      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Input
            type="search"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-10"
          />
          <Search className="text-muted-foreground absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-muted-foreground absolute end-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={cn(isRtl && 'text-right')}>{t('id')}</TableHead>
            <TableHead className={cn(isRtl && 'text-right')}>{t('fullName')}</TableHead>
            <TableHead className={cn(isRtl && 'text-right')}>{t('email')}</TableHead>
            <TableHead className={cn(isRtl && 'text-right')}>{t('phoneNumber')}</TableHead>
            <TableHead className={cn(isRtl && 'text-right')}>{t('isVerified')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.isVerified ? t('yes') : t('no')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
