import { ProtectedComponent } from '@/components/access/ProtectedComponent';
import DeleteExamForm from '@/components/forms/DeleteExamForm';
import ExamForm from '@/components/forms/ExamForm';
import QuestionsWrapper from '@/components/forms/QuestionsWrapper';
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
import { useStudentScores } from '@/hooks/useStudentScores';
import { useGetAllExamsQuery } from '@/lib/api/endpoints/exam';
import { Link } from 'react-router-dom';
import { formatLocalDateTime } from '@/lib/utils/formatLocalDateTime';
import { AlertCircle, Edit, Loader2, Play, PlusCircle, Search, X } from 'lucide-react';
import { useState } from 'react';

export default function ExamsPage() {
  const [filter, setFilter] = useState('');
  const { data, isLoading, isError } = useGetAllExamsQuery();
  const scores = useStudentScores(data?.data);

  const filteredExams = data?.data.filter(
    (exam) =>
      exam.title.toLowerCase().includes(filter.toLowerCase()) ||
      exam._id.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">Loading exams...</span>
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
            <p className="text-destructive text-center">Error loading exams</p>
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
            <p className="text-muted-foreground text-center">No exams found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="w-full flex">
      <div className="w-full flex-1 max-w-[1550px] mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="ps-1 text-xl font-semibold">Exams</h1>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <div className="relative">
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter exams..."
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
          <ProtectedComponent requiredRoles={['admin']}>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create Exam</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new exam</DialogTitle>
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
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Class Level</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <ProtectedComponent requiredRoles={['user']}>
              <TableHead>Score</TableHead>
            </ProtectedComponent>
            <ProtectedComponent requiredRoles={['admin', 'user']}>
              <TableHead>Actions</TableHead>
            </ProtectedComponent>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExams?.map((exam) => (
            <TableRow key={exam._id}>
              <TableCell>{exam._id}</TableCell>
              <TableCell>{exam.title}</TableCell>
              <TableCell>{exam.duration}</TableCell>
              <TableCell>{exam.classLevel}</TableCell>
              <TableCell>{exam.isPublished ? 'Yes' : 'No'}</TableCell>
              <TableCell>{formatLocalDateTime(exam.startDate)}</TableCell>
              <TableCell>{formatLocalDateTime(exam.endDate)}</TableCell>
              <ProtectedComponent requiredRoles={['user']}>
                <TableCell>{scores[exam._id] ?? 'Loading...'}</TableCell>
              </ProtectedComponent>
              <ProtectedComponent requiredRoles={['admin']}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <PlusCircle className="mr-1 h-4 w-4" />
                          Manage Questions
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Manage questions</DialogTitle>
                        </DialogHeader>
                        <QuestionsWrapper
                          examId={exam._id}
                          value={(exam.questions).map((q) => q._id)}
                        />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Exam</DialogTitle>
                        </DialogHeader>
                        <ExamForm type="update" data={exam} />
                      </DialogContent>
                    </Dialog>
                    <DeleteExamForm _id={exam._id} />
                  </div>
                </TableCell>
              </ProtectedComponent>
              <ProtectedComponent requiredRoles={['user']}>
                <TableCell>
                  <Link to={`/student-exam/${exam._id}`}>
                    <Button size="sm" variant="default">
                      <Play className="mr-1 h-4 w-4" />
                      Start
                    </Button>
                  </Link>
                </TableCell>
              </ProtectedComponent>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </section>
  );
}
