
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/components/auth/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizGrid } from '@/components/quiz/QuizGrid';
import { QuizProps } from '@/components/quiz/QuizCard';
import { BarChart, CalendarClock, FileQuestion, Users } from 'lucide-react';

// Mock data
const studentQuizzes: QuizProps[] = [
  { id: '1', title: 'Introduction to Mathematics', description: 'Basic arithmetic and algebra concepts', questionCount: 20, timeLimit: 30, dueDate: '2023-07-15', status: 'active' },
  { id: '2', title: 'World History', description: 'Ancient civilizations and world events', questionCount: 15, timeLimit: 25, dueDate: '2023-07-20', status: 'upcoming' },
  { id: '3', title: 'Biology Fundamentals', description: 'Cell structure and basic biology', questionCount: 25, timeLimit: 40, dueDate: '2023-07-10', status: 'completed', score: 85 },
];

const facultyQuizzes: QuizProps[] = [
  { id: '1', title: 'Introduction to Mathematics', description: 'Basic arithmetic and algebra concepts', questionCount: 20, timeLimit: 30, dueDate: '2023-07-15', status: 'active' },
  { id: '2', title: 'Advanced Calculus', description: 'Differentiation and integration', questionCount: 15, timeLimit: 45, dueDate: '2023-07-25', status: 'draft' },
  { id: '3', title: 'Physics Mechanics', description: 'Newton\'s laws and classical mechanics', questionCount: 30, timeLimit: 60, status: 'upcoming' },
  { id: '4', title: 'Chemistry Basics', description: 'Periodic table and chemical reactions', questionCount: 25, timeLimit: 40, status: 'completed' },
];

const adminStats = [
  { title: 'Total Users', value: '1,258', icon: <Users className="h-8 w-8 text-primary-600" /> },
  { title: 'Active Quizzes', value: '42', icon: <FileQuestion className="h-8 w-8 text-secondary-600" /> },
  { title: 'Scheduled Today', value: '7', icon: <CalendarClock className="h-8 w-8 text-accent-600" /> },
  { title: 'Completed This Week', value: '156', icon: <BarChart className="h-8 w-8 text-green-600" /> },
];

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const renderStudentDashboard = () => (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Student Dashboard</h2>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>
      
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Your Upcoming Quizzes</h3>
        <QuizGrid quizzes={studentQuizzes} />
      </div>
    </>
  );
  
  const renderFacultyDashboard = () => (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Faculty Dashboard</h2>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">20</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Total Quizzes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">152</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Student Submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">78%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Average Score</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Your Quizzes</h3>
        <QuizGrid quizzes={facultyQuizzes} />
      </div>
    </>
  );
  
  const renderAdminDashboard = () => (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {adminStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center justify-center pt-6">
              {stat.icon}
              <h3 className="text-3xl font-bold mt-4">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Recent Quizzes</h3>
        <QuizGrid quizzes={facultyQuizzes.slice(0, 3)} />
      </div>
    </>
  );

  return (
    <DashboardLayout>
      {user.role === 'student' && renderStudentDashboard()}
      {user.role === 'faculty' && renderFacultyDashboard()}
      {user.role === 'admin' && renderAdminDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
