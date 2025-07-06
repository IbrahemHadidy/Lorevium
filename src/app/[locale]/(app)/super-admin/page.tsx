'use client';

import RegisterForm from '@/components/forms/register-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetAllAdminsQuery, useGetAllUsersQuery } from '@/lib/api/endpoints/admin';
import type { User } from '@/lib/types/models/user';
import { AlertCircle, Loader2, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function SuperAdminPage() {
  const [filter, setFilter] = useState('');
  const [currentTab, setCurrentTab] = useState('users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: allUsers,
    isLoading: isAllUsersLoading,
    isError: isAllUsersError,
  } = useGetAllUsersQuery();
  const {
    data: allAdmins,
    isLoading: isAllAdminsLoading,
    isError: isAllAdminsError,
  } = useGetAllAdminsQuery();
  const t = useTranslations('AdminUsers');

  return (
    <>
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full flex-1">
        <TabsList>
          <TabsTrigger value="users">{t('allUsersTab')}</TabsTrigger>
          <TabsTrigger value="admins">{t('allAdminsTab')}</TabsTrigger>
        </TabsList>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={t('filterPlaceholder') ?? 'Filter users...'}
              className="ps-10 pe-10 sm:w-64"
            />
            <Search className="text-muted-foreground absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            {filter && (
              <button
                type="button"
                onClick={() => setFilter('')}
                aria-label={t('clearFilter')}
                className="text-muted-foreground hover:text-foreground absolute end-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {currentTab === 'admins' && (
            <div className="flex justify-end">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button>{t('createAdminButton')}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('createAdminModalTitle')}</DialogTitle>
                  </DialogHeader>
                  <RegisterForm />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <TabsContent value="users" className="flex flex-1 flex-col">
          <UsersTable
            data={allUsers?.data?.filter(
              (user) =>
                user.fullName.toLowerCase().includes(filter.toLowerCase()) ||
                user.email.toLowerCase().includes(filter.toLowerCase())
            )}
            isLoading={isAllUsersLoading}
            isError={isAllUsersError}
            t={t}
          />
        </TabsContent>

        <TabsContent value="admins" className="flex flex-1 flex-col">
          <UsersTable
            data={allAdmins?.data?.filter(
              (user) =>
                user.fullName.toLowerCase().includes(filter.toLowerCase()) ||
                user.email.toLowerCase().includes(filter.toLowerCase())
            )}
            isLoading={isAllAdminsLoading}
            isError={isAllAdminsError}
            t={t}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

function UsersTable({
  data,
  isLoading,
  isError,
  t,
}: {
  data?: User[];
  isLoading: boolean;
  isError: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  if (isLoading) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <div className="translate-y-[-10%] transition-transform duration-300">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
              <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
              <span className="text-muted-foreground">{t('loading')}</span>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <div className="translate-y-[-10%] transition-transform duration-300">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
              <AlertCircle className="text-destructive h-6 w-6" />
              <p className="text-destructive text-center">{t('errorLoadingUsers')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <div className="translate-y-[-10%] transition-transform duration-300">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
              <p className="text-muted-foreground text-center">{t('noUsersFound')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('id')}</TableHead>
            <TableHead>{t('fullName')}</TableHead>
            <TableHead>{t('email')}</TableHead>
            <TableHead>{t('phoneNumber')}</TableHead>
            <TableHead>{t('isVerified')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
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
    </div>
  );
}
