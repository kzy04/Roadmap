import React from 'react';
import { BookOpen, Users, User, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">CourseMap</h1>
          <nav className="flex items-center space-x-8">
            {user && (
              <a href="/course" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                <GraduationCap size={20} />
                <span>Course</span>
              </a>
            )}
            <a href="/blogs" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <BookOpen size={20} />
              <span>Blogs</span>
            </a>
            <a href="/forums" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Users size={20} />
              <span>Forums</span>
            </a>
            <a href="/profile" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <User size={20} />
              <span>Profile</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;