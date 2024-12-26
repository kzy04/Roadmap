'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the User interface
interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  department: string;
  semester: number;
  completedCourses: string[];
  points: number;
  badges: string[];
  bio?: string;
  courses?: string[]; // Added courses property
  achievements?: string[]; // Added achievements property
  interests?: string[];
  
}

// Define the AuthContextType interface
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the AuthContext with default null value
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to handle user login
  const login = (userData: User) => setUser(userData);

  // Function to handle user logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
