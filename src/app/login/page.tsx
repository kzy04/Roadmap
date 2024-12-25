'use client';

import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react';

const Login = () => {
  const router = useRouter(); // Use useRouter for navigation
  const { login } = useAuth();

  const handleLogin = () => {
    // Mock user data
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      university: 'North South University',
      department: 'Computer Science',
      semester: 3,
      completedCourses: ['cse115'],
      points: 750,
      badges: ['first-semester'],
    };

    login(mockUser); // Log the user in
    router.push('/course'); // Navigate to the course page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Login to CourseMap
          </h1>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login as Demo User
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
