'use client';

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
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteQuestionMutation, useGetQuestionByIdQuery } from '@/lib/api/endpoints/question';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import QuestionFormModal from './question-form';

type QuestionsWrapperProps = {
  examId: string;
  value: string[];
};

export default function QuestionsWrapper({ examId, value }: QuestionsWrapperProps) {
  const t = useTranslations('Questions');
  const [questions, setQuestions] = useState(value);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Just update local questions list
  const handleAdd = (newData: { exam: string }, index?: number) => {
    if (index !== undefined) {
      setQuestions((prev) => prev.map((q, i) => (i === index ? newData.exam : q)));
    } else {
      setQuestions((prev) => [...prev, newData.exam]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {questions.map((questionId) => (
          <Question
            key={questionId}
            questionId={questionId}
            index={questions.indexOf(questionId)}
            examId={examId}
            setQuestions={setQuestions}
            handleAdd={handleAdd}
          />
        ))}
      </div>

      {/* Add new question */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('createQuestionButton')}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('addQuestionTitle')}</DialogTitle>
          </DialogHeader>
          <QuestionFormModal
            examId={examId}
            onAdd={(newData) => {
              handleAdd(newData);
              setIsAddModalOpen(false);
            }}
            type="create"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Question({
  questionId,
  index,
  examId,
  setQuestions,
  handleAdd,
}: {
  questionId: string;
  index: number;
  examId: string;
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  handleAdd: (newData: { exam: string }, index?: number) => void;
}) {
  const t = useTranslations('Questions');

  const { data, isLoading, isError } = useGetQuestionByIdQuery({ _id: questionId });
  const [deleteQuestion, { isLoading: isDeleting }] = useDeleteQuestionMutation();

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Delete question from backend and local list
  const handleDelete = async (index: number, questionId: string) => {
    try {
      await deleteQuestion({ _id: questionId }).unwrap();
      setQuestions((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Failed to delete question:', error);
      toast.error(t('failedToDeleteQuestion'));
    }
  };

  return (
    <Card className="py-0">
      <CardContent className="flex items-center justify-between p-3">
        {isLoading && <span>{t('loadingQuestion')}</span>}
        {isError && <span>{t('failedToLoadQuestion')}</span>}
        {data && <span>{data.data.text}</span>}

        <div className="flex gap-2">
          {/* Edit */}
          <Dialog
            open={editingIndex === index}
            onOpenChange={(open) => setEditingIndex(open ? index : null)}
          >
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" aria-label={t('editQuestion')}>
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('editQuestionTitle')}</DialogTitle>
              </DialogHeader>
              {data ? (
                <QuestionFormModal
                  examId={examId}
                  onAdd={(newData) => {
                    handleAdd(newData, index);
                    setEditingIndex(null);
                  }}
                  values={data.data}
                  type="update"
                />
              ) : (
                <span>{t('loadingQuestion')}</span>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" aria-label={t('deleteQuestion')}>
                <Trash2 className="text-destructive h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('confirmDeleteTitle')}</AlertDialogTitle>
                <AlertDialogDescription>{t('confirmDeleteDescription')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive"
                  disabled={isDeleting}
                  onClick={() => handleDelete(index, questionId)}
                >
                  {t('delete')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
