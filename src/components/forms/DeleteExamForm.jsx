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
import { useDeleteExamMutation } from "@/lib/api/endpoints/exam";
import { LoaderCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteExamForm({ _id }) {
  const [deleteExam, { isLoading }] = useDeleteExamMutation();

  const handleDelete = async () => {
    try {
      await deleteExam({ _id }).unwrap();
      toast.success("Exam deleted successfully");
    } catch (error) {
      toast.error("Failed to delete exam");
      console.error("Failed to delete exam:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="mr-1 h-4 w-4 animate-spin" />
              Deleting exam...
            </>
          ) : (
            <>
              <Trash2 className="mr-1 h-4 w-4" />
              Delete exam
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the exam.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
