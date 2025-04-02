
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, Check, Users, BarChart, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white">
        <div className="container mx-auto px-6 py-20 text-center md:py-32">
          <h1 className="animate-fade-in mb-6 text-4xl font-bold md:text-6xl">
            Quiz Master Academy
          </h1>
          <p className="animate-fade-up mb-10 mx-auto max-w-3xl text-lg opacity-90 md:text-xl">
            The comprehensive quiz management platform designed for educators and students.
            Create, manage, and take quizzes with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                Get Started
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to create engaging assessments and measure student progress effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm card-hover">
              <div className="bg-primary-100 text-primary-700 p-2 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Quiz Creation</h3>
              <p className="text-gray-600">
                Create various types of questions including multiple-choice, true/false, and short answers with our intuitive interface.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm card-hover">
              <div className="bg-secondary-100 text-secondary-700 p-2 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">
                Gain insights into student performance with comprehensive analytics and detailed reports.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm card-hover">
              <div className="bg-accent-100 text-accent-700 p-2 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Grading</h3>
              <p className="text-gray-600">
                Save time with automatic grading and instant feedback for students on quiz completion.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm card-hover">
              <div className="bg-green-100 text-green-700 p-2 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">
                Different interfaces and permissions for students, faculty, and administrators for a tailored experience.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm card-hover">
              <div className="bg-purple-100 text-purple-700 p-2 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your data is protected with advanced security measures ensuring privacy and reliability.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm card-hover">
              <div className="bg-red-100 text-red-700 p-2 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Question Bank</h3>
              <p className="text-gray-600">
                Create and store questions in a centralized bank for reuse across multiple quizzes.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to elevate your assessment experience?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of educators and students who have transformed their quiz experience with Quiz Master Academy.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-primary-700 text-white hover:bg-primary-800">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
