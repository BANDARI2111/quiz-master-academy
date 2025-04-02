
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Define user roles
export type UserRole = 'student' | 'faculty' | 'admin';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Mock users for demonstration
const mockUsers: User[] = [
  { id: '1', name: 'John Student', email: 'student@example.com', role: 'student' },
  { id: '2', name: 'Jane Faculty', email: 'faculty@example.com', role: 'faculty' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication (in a real app, this would be an API call)
    try {
      // Simple validation
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return false;
      }

      // Find user by email (in real app, validate password too)
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && password === "password") {
        setUser(foundUser);
        setIsAuthenticated(true);
        localStorage.setItem('quizUser', JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        toast.error("Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('quizUser');
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
