'use client';

import { ProtectedComponent } from '@/components/access/protected-component';
import DeleteLessonDialog from '@/components/dialogs/delete-lesson-dialog';
import LessonForm from '@/components/forms/lesson-form';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  useGetPaginatedLessonsQuery,
  useGetPurchasedLessonsQuery,
  usePayLessonMutation,
} from '@/lib/api/endpoints/lesson';
import { Role } from '@/lib/enums/role';
import { Link } from '@/lib/i18n/navigation';
import type { Lesson } from '@/lib/types/models/lesson';
import { formatLocalDateTime } from '@/lib/utils/format-local-date-time';
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table';
import { Edit, Loader, Play, PlusCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

export default function LessonsPage() {
  const t = useTranslations('Lessons');
  const locale = useLocale();

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isPaying, setIsPaying] = useState(false);

  const { data, isLoading, isError, isFetching, refetch } = useGetPaginatedLessonsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sortBy: sorting[0]?.id ?? 'scheduledDate',
    sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
  });

  const {
    data: purchasedLessons,
    isLoading: isPurchasedLessonsLoading,
    refetch: refetchPurchasedLessons,
  } = useGetPurchasedLessonsQuery();

  const columns = useMemo<ColumnDef<Lesson>[]>(
    () => [
      {
        accessorKey: '_id',
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('Columns.id')} />,
        enableSorting: true,
      },
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('Columns.title')} />
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'classLevel',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('Columns.classLevel')} />
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'scheduledDate',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('Columns.scheduledDate')} />
        ),
        cell: (info) => formatLocalDateTime(info.getValue() as string, locale),
        enableSorting: true,
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('Columns.price')} />
        ),
        cell: (info) =>
          info.getValue() !== null && info.getValue() !== 0
            ? `${info.getValue()} ${t('currency')}`
            : t('free'),
        enableSorting: true,
      },
      {
        id: 'actions',
        header: t('Columns.actions'),
        cell: ({ row }) => {
          const lesson = row.original;
          const isPurchased = purchasedLessons?.data?.some((p) => p._id === lesson._id);
          return (
            <LessonActions
              lesson={lesson}
              isPurchased={!!isPurchased}
              isPurchasedLessonsLoading={isPurchasedLessonsLoading}
              refetchLessons={refetch}
              refetchPurchasedLessons={refetchPurchasedLessons}
              setGlobalPaying={setIsPaying}
            />
          );
        },
      },
    ],
    [t, locale, purchasedLessons?.data, isPurchasedLessonsLoading, refetch, refetchPurchasedLessons]
  );

  if (isError) return <p className="text-destructive text-center">{t('Errors.load')}</p>;

  return (
    <div className="w-full flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t('title')}</h1>
        <ProtectedComponent requiredRoles={[Role.ADMIN]}>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('addLessonButton')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('createDialogTitle')}</DialogTitle>
              </DialogHeader>
              <LessonForm type="create" />
            </DialogContent>
          </Dialog>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        totalItems={data?.pagination.total ?? 0}
        pageSizeOptions={[5, 10, 15, 20]}
        isLoading={isLoading}
        isFetching={isFetching}
        paginationState={pagination}
        onPaginationChange={setPagination}
        sortingState={sorting}
        onSortingChange={setSorting}
      />

      {isPaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-2 text-white">
            <Loader className="animate-spin" size={32} />
            <p>{t('waitingForPayment')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function LessonActions({
  lesson,
  isPurchased,
  isPurchasedLessonsLoading,
  refetchLessons,
  refetchPurchasedLessons,
  setGlobalPaying,
}: {
  lesson: Lesson;
  isPurchased: boolean;
  isPurchasedLessonsLoading: boolean;
  refetchLessons: () => void;
  refetchPurchasedLessons: () => void;
  setGlobalPaying: (paying: boolean) => void;
}) {
  const t = useTranslations('Lessons');
  const [payLesson, { isLoading: isPayLessonLoading }] = usePayLessonMutation();

  const handlePayLesson = async (_id: string) => {
    try {
      setGlobalPaying(true);
      const { paymentUrl } = await payLesson({ _id }).unwrap();

      const paymentWindow = window.open(paymentUrl, '_blank', 'width=500,height=600');
      if (!paymentWindow) throw new Error('Could not open payment window');

      const interval = setInterval(() => {
        if (paymentWindow.closed) {
          clearInterval(interval);
          refetchLessons();
          refetchPurchasedLessons();
          setGlobalPaying(false);
        }
      }, 500);
    } catch (error) {
      console.error(error);
      setGlobalPaying(false);
    }
  };

  return (
    <div className="flex gap-2">
      <ProtectedComponent requiredRoles={[Role.ADMIN]}>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Edit size={16} />
              {t('Actions.edit')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('editDialogTitle')}</DialogTitle>
            </DialogHeader>
            <LessonForm type="update" data={lesson} />
          </DialogContent>
        </Dialog>
        <DeleteLessonDialog _id={lesson._id} />
      </ProtectedComponent>

      <ProtectedComponent requiredRoles={[Role.USER]}>
        {isPurchased || !lesson.isPaid ? (
          <Link href={`/lessons/${lesson._id}`}>
            <Button size="sm" disabled={isPurchasedLessonsLoading}>
              <Play size={16} />
              {t('Actions.play')}
            </Button>
          </Link>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            disabled={isPayLessonLoading}
            onClick={() => handlePayLesson(lesson._id)}
          >
            <Play size={16} />
            {t('Actions.payAndPlay')}
          </Button>
        )}
      </ProtectedComponent>
    </div>
  );
}
