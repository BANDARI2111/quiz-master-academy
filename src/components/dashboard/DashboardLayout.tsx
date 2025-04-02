
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { 
  BookOpen, 
  Home, 
  FileQuestion, 
  Users, 
  Settings, 
  BarChart, 
  List,
  Award,
  CalendarClock
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon, label, to, isActive }: SidebarItemProps) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      isActive 
        ? 'bg-primary-50 text-primary-900'
        : 'text-gray-500 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Define which menu items to show based on user role
  const getNavItems = () => {
    const commonItems = [
      {
        icon: <Home className="h-4 w-4" />,
        label: 'Dashboard',
        to: '/dashboard'
      }
    ];
    
    if (user?.role === 'student') {
      return [
        ...commonItems,
        {
          icon: <FileQuestion className="h-4 w-4" />,
          label: 'Available Quizzes',
          to: '/quizzes'
        },
        {
          icon: <Award className="h-4 w-4" />,
          label: 'My Results',
          to: '/results'
        }
      ];
    }
    
    if (user?.role === 'faculty') {
      return [
        ...commonItems,
        {
          icon: <FileQuestion className="h-4 w-4" />,
          label: 'My Quizzes',
          to: '/quizzes'
        },
        {
          icon: <List className="h-4 w-4" />,
          label: 'Question Bank',
          to: '/questions'
        },
        {
          icon: <BarChart className="h-4 w-4" />,
          label: 'Results',
          to: '/results'
        },
        {
          icon: <CalendarClock className="h-4 w-4" />,
          label: 'Schedule',
          to: '/schedule'
        }
      ];
    }
    
    if (user?.role === 'admin') {
      return [
        ...commonItems,
        {
          icon: <Users className="h-4 w-4" />,
          label: 'Users',
          to: '/users'
        },
        {
          icon: <FileQuestion className="h-4 w-4" />,
          label: 'All Quizzes',
          to: '/quizzes'
        },
        {
          icon: <BarChart className="h-4 w-4" />,
          label: 'Analytics',
          to: '/analytics'
        },
        {
          icon: <Settings className="h-4 w-4" />,
          label: 'Settings',
          to: '/settings'
        }
      ];
    }
    
    return commonItems;
  };
  
  const navItems = getNavItems();
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col gap-y-4 w-64 border-r bg-gray-50/50 p-4">
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary-700" />
            <span className="font-semibold text-primary-700">Quiz Master</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item, index) => (
            <SidebarItem 
              key={index}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>
    </div>
  );
};
