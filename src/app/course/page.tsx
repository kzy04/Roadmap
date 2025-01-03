'use client';

import AchievementCard from '@/components/course/AchievementCard';
import CourseNode from '@/components/course/CourseNode';
import ProgressBar from '@/components/course/ProgressBar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { cseCourses, achievements } from '@/data/courseData';
import React, {  useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Course = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // Render nothing while redirecting
  }

  const calculateLevel = (points: number) => Math.floor(points / 1000) + 1;
  const nextLevelPoints = calculateLevel(user.points) * 1000;

  const isCourseAvailable = (course: typeof cseCourses[0]) => {
    return course.prerequisites.every(preReq => 
      user.completedCourses.includes(preReq)
    );
  };

  const handleCourseComplete = (courseId: string) => {
    console.log('Completed course:', courseId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Your Course Roadmap
            </h1>
            <ProgressBar 
              level={calculateLevel(user.points)}
              currentPoints={user.points % 1000}
              nextLevelPoints={nextLevelPoints}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cseCourses.map((course) => (
                <CourseNode
                  key={course.id}
                  course={course}
                  isAvailable={isCourseAvailable(course)}
                  onComplete={() => handleCourseComplete(course.id)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  isUnlocked={user.badges.includes(achievement.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Course;
