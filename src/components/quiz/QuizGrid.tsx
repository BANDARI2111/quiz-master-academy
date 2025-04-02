
import React from 'react';
import { QuizCard, QuizProps } from './QuizCard';
import { useAuth } from '@/components/auth/AuthContext';

interface QuizGridProps {
  quizzes: QuizProps[];
}

export const QuizGrid = ({ quizzes }: QuizGridProps) => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} userRole={user.role as 'student' | 'faculty' | 'admin'} />
      ))}
    </div>
  );
};
