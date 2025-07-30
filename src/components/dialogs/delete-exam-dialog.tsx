import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteExamMutation } from '@/lib/api/endpoints/exam';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function DeleteExamDialog({ _id }: { _id: string }) {
  const t = useTranslations('Exams');
  const [deleteExam, { isLoading }] = useDeleteExamMutation();

  const handleDelete = async () => {
    try {
      await deleteExam({ _id }).unwrap();
      toast.success(t('deletedSuccess'));
    } catch (error) {
      toast.error(t('deleteFailed'));
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="mr-1 h-4 w-4 animate-spin" />
              {t('deletingExam')}
            </>
          ) : (
            <>
              <Trash2 className="mr-1 h-4 w-4" />
              {t('deleteExamButton')}
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('deleteConfirmTitle')}</AlertDialogTitle>
          <AlertDialogDescription>{t('deleteConfirmDescription')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="bg-destructive">
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                {t('deletingExam')}
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                {t('delete')}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
