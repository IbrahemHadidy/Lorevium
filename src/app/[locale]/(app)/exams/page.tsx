'use client';

import { ProtectedComponent } from '@/components/access/protected-component';
import DeleteExamDialog from '@/components/dialogs/delete-exam-dialog';
import ExamForm from '@/components/forms/exam-form';
import QuestionsWrapper from '@/components/forms/questions-wrapper';
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
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useStudentScores } from '@/hooks/use-student-scores';
import { useGetAllExamsQuery } from '@/lib/api/endpoints/exam';
import { Role } from '@/lib/enums/role';
import { Link } from '@/lib/i18n/navigation';
import type { Exam } from '@/lib/types/models/exam';
import { Question } from '@/lib/types/models/question';
import { cn } from '@/lib/utils/cn';
import { formatLocalDateTime } from '@/lib/utils/format-local-date-time';
import { AlertCircle, Edit, Play, PlusCircle, Search, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

function ExamRow({ exam }: { exam: Exam }) {
  const t = useTranslations('Exams');
  const locale = useLocale();
  const tClassLevel = useTranslations('ClassLevel');
  const { data } = useGetAllExamsQuery();
  const { scores, isSubmitted } = useStudentScores(data?.data);

  return (
    <TableRow key={exam._id}>
      <TableCell>{exam._id}</TableCell>
      <TableCell>{exam.title}</TableCell>
      <TableCell>{exam.duration}</TableCell>
      <TableCell>{tClassLevel(exam.classLevel)}</TableCell>
      <TableCell>{exam.isPublished ? t('yes') : t('no')}</TableCell>
      <TableCell>{formatLocalDateTime(exam.startDate, locale)}</TableCell>
      <TableCell>{formatLocalDateTime(exam.endDate, locale)}</TableCell>
      <ProtectedComponent requiredRoles={[Role.USER]}>
        <TableCell>{scores[exam._id] ?? t('loading')}</TableCell>
      </ProtectedComponent>
      <ProtectedComponent requiredRoles={[Role.ADMIN]}>
        <TableCell>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <PlusCircle className="mr-1 h-4 w-4" />
                  {t('manageQuestions')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('manageQuestionsForExam')}</DialogTitle>
                </DialogHeader>
                <QuestionsWrapper
                  examId={exam._id}
                  value={(exam.questions as Question[]).map((q) => q._id)}
                />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Edit className="mr-1 h-4 w-4" />
                  {t('edit')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('editExamModalTitle')}</DialogTitle>
                </DialogHeader>
                <ExamForm type="update" data={exam} />
              </DialogContent>
            </Dialog>
            <DeleteExamDialog _id={exam._id} />
          </div>
        </TableCell>
      </ProtectedComponent>
      <ProtectedComponent requiredRoles={[Role.USER]}>
        <TableCell>
          <Link
            href={`/exams/${exam._id}`}
            className={cn(
              !exam.isPublished ||
                new Date(exam.startDate).getTime() > Date.now() ||
                new Date(exam.endDate).getTime() < Date.now() ||
                isSubmitted[exam._id]
                ? 'pointer-events-none'
                : ''
            )}
          >
            <Button
              size="sm"
              variant="default"
              disabled={
                !exam.isPublished ||
                new Date(exam.startDate).getTime() > Date.now() ||
                new Date(exam.endDate).getTime() < Date.now() ||
                isSubmitted[exam._id]
              }
            >
              {isSubmitted[exam._id] ? (
                <>
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {t('submitted')}
                </>
              ) : (
                <>
                  <Play className="mr-1 h-4 w-4" />
                  {t('start')}
                </>
              )}
            </Button>
          </Link>
        </TableCell>
      </ProtectedComponent>
    </TableRow>
  );
}

export default function ExamsPage() {
  const [filter, setFilter] = useState('');
  const { data, isLoading, isError } = useGetAllExamsQuery();
  const t = useTranslations('Exams');
  const locale = useLocale();

  const isRtl = locale === 'ar';

  const filteredExams = data?.data.filter(
    (exam) =>
      exam.title.toLowerCase().includes(filter.toLowerCase()) ||
      exam._id.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <AlertCircle className="text-destructive h-6 w-6" />
            <p className="text-destructive text-center">{t('errorLoadingExams')}</p>
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
            <p className="text-muted-foreground text-center">{t('noExamsFound')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="w-full flex-1">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="ps-1 text-xl font-semibold">{t('title')}</h1>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <div className="relative">
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={t('filterPlaceholder') ?? 'Filter exams...'}
              className="ps-10 sm:w-64"
            />
            <Search className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
            {filter && (
              <button
                type="button"
                onClick={() => setFilter('')}
                className="text-muted-foreground absolute end-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <ProtectedComponent requiredRoles={[Role.ADMIN]}>
            <Dialog>
              <DialogTrigger asChild>
                <Button>{t('createExamButton')}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('createExamModalTitle')}</DialogTitle>
                </DialogHeader>
                <ExamForm type="create" />
              </DialogContent>
            </Dialog>
          </ProtectedComponent>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={cn(isRtl && 'text-right')}>{t('id')}</TableHead>
            <TableHead className={cn(isRtl && 'text-right')}>{t('examTitle')}</TableHead>
            <TableHead className={cn(isRtl && 'text-right')}>{t('duration')}</TableHead>
            <TableHead className={cn(isRtl && 'text-right')}>{t('classLevel')}</TableHead>
            <TableHead className={cn(isRtl && 'text-right')}>{t('isPublished')}</TableHead>
            <TableHead className={cn(isRtl && 'text-right')}>{t('startDate')}</TableHead>
            <TableHead className={cn(isRtl && 'text-right')}>{t('endDate')}</TableHead>
            <ProtectedComponent requiredRoles={[Role.USER]}>
              <TableHead className={cn(isRtl && 'text-right')}>{t('score')}</TableHead>
            </ProtectedComponent>
            <ProtectedComponent requiredRoles={[Role.ADMIN, Role.USER]}>
              <TableHead className={cn(isRtl && 'text-right')}>{t('actions')}</TableHead>
            </ProtectedComponent>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExams?.map((exam) => (
            <ExamRow key={exam._id} exam={exam} />
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
