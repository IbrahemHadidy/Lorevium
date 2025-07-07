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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useDeleteQuestionMutation,
  useGetQuestionByIdQuery,
} from "@/lib/api/endpoints/question";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import QuestionFormModal from "./QuestionForm";

export default function QuestionsWrapper({ examId, value }) {
  const [questions, setQuestions] = useState(value);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAdd = (newData, index) => {
    if (index !== undefined) {
      setQuestions((prev) =>
        prev.map((q, i) => (i === index ? newData.exam : q))
      );
    } else {
      setQuestions((prev) => [...prev, newData.exam]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {questions.map((questionId, idx) => (
          <Question
            key={questionId}
            questionId={questionId}
            index={idx}
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
            Add New Question
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new question</DialogTitle>
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

function Question({ questionId, index, examId, setQuestions, handleAdd }) {
  const { data, isLoading, isError } = useGetQuestionByIdQuery({
    _id: questionId,
  });
  const [deleteQuestion, { isLoading: isDeleting }] =
    useDeleteQuestionMutation();
  const [editingIndex, setEditingIndex] = useState(null);

  const handleDelete = async (idx, questionId) => {
    try {
      await deleteQuestion({ _id: questionId }).unwrap();
      setQuestions((prev) => prev.filter((_, i) => i !== idx));
    } catch (error) {
      console.error("Failed to delete question:", error);
      toast.error("Failed to delete question");
    }
  };

  return (
    <Card className="py-0">
      <CardContent className="flex items-center justify-between p-3">
        {isLoading && <span>Loading question...</span>}
        {isError && <span>Failed to load question</span>}
        {data && <span>{data.data.text}</span>}

        <div className="flex gap-2">
          {/* Edit */}
          <Dialog
            open={editingIndex === index}
            onOpenChange={(open) => setEditingIndex(open ? index : null)}
          >
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Edit question">
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit question</DialogTitle>
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
                <span>Loading question...</span>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Delete question">
                <Trash2 className="text-destructive h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete question?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive"
                  disabled={isDeleting}
                  onClick={() => handleDelete(index, questionId)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
