
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarClock, Clock, FileQuestion } from 'lucide-react';

export interface QuizProps {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  timeLimit: number; // in minutes
  dueDate?: string;
  status?: 'active' | 'upcoming' | 'completed' | 'draft';
  score?: number;
}

interface QuizCardProps {
  quiz: QuizProps;
  userRole: 'student' | 'faculty' | 'admin';
}

export const QuizCard = ({ quiz, userRole }: QuizCardProps) => {
  const getBadgeVariant = (status: string | undefined) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return '';
    }
  };

  return (
    <Card className="quiz-card h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{quiz.title}</CardTitle>
          {quiz.status && (
            <Badge className={getBadgeVariant(quiz.status)}>
              {quiz.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-600 mb-4">{quiz.description}</p>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FileQuestion className="h-4 w-4" />
            <span>{quiz.questionCount} Questions</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{quiz.timeLimit} Minutes</span>
          </div>
          {quiz.dueDate && (
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarClock className="h-4 w-4" />
              <span>Due: {quiz.dueDate}</span>
            </div>
          )}
          {quiz.score !== undefined && (
            <div className="mt-2 text-primary-700 font-semibold">
              Score: {quiz.score}%
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        {userRole === 'student' ? (
          quiz.status === 'active' ? (
            <Link to={`/quiz/${quiz.id}`} className="w-full">
              <Button className="w-full">Take Quiz</Button>
            </Link>
          ) : quiz.status === 'completed' ? (
            <Link to={`/results/${quiz.id}`} className="w-full">
              <Button variant="outline" className="w-full">View Results</Button>
            </Link>
          ) : (
            <Button disabled className="w-full">
              {quiz.status === 'upcoming' ? 'Coming Soon' : 'Unavailable'}
            </Button>
          )
        ) : (
          <div className="flex gap-2 w-full">
            <Link to={`/quiz/${quiz.id}/edit`} className="flex-1">
              <Button variant="outline" className="w-full">Edit</Button>
            </Link>
            <Link to={`/quiz/${quiz.id}/results`} className="flex-1">
              <Button className="w-full">Results</Button>
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
