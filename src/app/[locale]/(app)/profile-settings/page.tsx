'use client';

import DeleteUserForm from '@/components/forms/delete-user-form';
import UpdateUserForm from '@/components/forms/update-user-form';
import { useTranslations } from 'next-intl';

export default function ProfileSettingsPage() {
  const t = useTranslations('RegisterAndUpdate');

  return (
    <div className="container mx-auto w-full flex-1 space-y-8 p-4">
      <section className="max-w-xl">
        <h2 className="mb-4 text-xl font-semibold">{t('settingsLabel')}</h2>
        <UpdateUserForm />
      </section>

      <section className="border-destructive bg-destructive/10 max-w-xl rounded-md border p-4">
        <h2 className="text-destructive mb-4 text-xl font-semibold">{t('dangerZone')}</h2>
        <DeleteUserForm />
      </section>
    </div>
  );
}
