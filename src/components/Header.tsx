'use client';

import React from 'react';
import Link from 'next/link'; // Import Next.js Link for routing
import { BookOpen, Users, User, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // Use absolute import if configured

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold tracking-tight">
            CourseMap
          </Link>
          
          <nav className="flex items-center space-x-8">
          <Link
                href="/university"
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              >
                <GraduationCap size={20} />
                <span>Universities</span>
              </Link>
            {user && (
              <Link
                href="/course"
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              >
                <GraduationCap size={20} />
                <span>Course</span>
              </Link>
            )}
             <Link
              href="/roadmap"
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
            >
              <User size={20} />
              <span>Roadmap</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
            >
              <BookOpen size={20} />
              <span>Blogs</span>
            </Link>
            <Link
              href="/forum"
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
            >
              <Users size={20} />
              <span>Forums</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
           
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
