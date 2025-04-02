
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthContext';
import { ClockIcon, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

// Mock data for a single quiz
const mockQuiz = {
  id: '1',
  title: 'Introduction to Mathematics',
  description: 'Basic arithmetic and algebra concepts',
  timeLimit: 30,
  questions: [
    {
      id: 'q1',
      text: 'What is 2 + 2?',
      options: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
        { id: 'c', text: '5' },
        { id: 'd', text: '6' }
      ],
      correctAnswer: 'b'
    },
    {
      id: 'q2',
      text: 'Solve for x: 3x = 9',
      options: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
        { id: 'c', text: '5' },
        { id: 'd', text: '6' }
      ],
      correctAnswer: 'a'
    },
    {
      id: 'q3',
      text: 'What is the area of a square with side length 4?',
      options: [
        { id: 'a', text: '8' },
        { id: 'b', text: '12' },
        { id: 'c', text: '16' },
        { id: 'd', text: '4' }
      ],
      correctAnswer: 'c'
    }
  ]
};

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast: uiToast } = useToast();
  
  // In a real app, we would fetch the quiz data based on quizId
  const quiz = mockQuiz;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // Convert minutes to seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const timePercentage = (timeLeft / (quiz.timeLimit * 60)) * 100;

  // Effect for the countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Auto-submit when time runs out
          toast.warning("Time's up! Submitting quiz...");
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup the timer when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    
    // In a real app, we would submit this to an API
    setTimeout(() => {
      setIsSubmitting(false);
      uiToast({
        title: "Quiz submitted successfully",
        description: `Your score: ${score}%`,
      });
      navigate('/dashboard');
    }, 1500);
  };
  
  // If user is not authenticated or not a student, redirect
  if (!user || user.role !== 'student') {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">{quiz.title}</h2>
        <p className="text-gray-600">{quiz.description}</p>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
          <div className="flex items-center gap-2 text-amber-600 font-medium">
            <ClockIcon className="h-4 w-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        
        <Progress value={timePercentage} className={`h-2 ${timePercentage < 20 ? 'bg-red-200' : 'bg-blue-200'}`} />
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <div
                key={option.id}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  answers[currentQuestion.id] === option.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
              >
                {option.text}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span className="text-sm text-gray-600">
            Your answers are automatically saved
          </span>
        </div>
        
        <Button 
          variant="destructive"
          onClick={() => {
            if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
              navigate('/dashboard');
            }
          }}
        >
          Exit Quiz
        </Button>
      </div>

      {/* Question navigation */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Question Navigator</h3>
        <div className="flex flex-wrap gap-2">
          {quiz.questions.map((q, idx) => (
            <Button
              key={q.id}
              variant={answers[q.id] ? "default" : "outline"}
              size="sm"
              className={`w-10 h-10 ${currentQuestionIndex === idx ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setCurrentQuestionIndex(idx)}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Quiz;
