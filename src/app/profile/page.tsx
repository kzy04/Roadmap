'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Edit2 } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    university: 'University of Example',
    bio: 'A passionate learner pursuing a degree in Computer Science.',
    courses: ['CS101', 'CS102', 'Math201'],
    achievements: ['Dean’s List 2023', 'Hackathon Winner'],
  });
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Your Profile</h1>
            <p className="text-lg text-gray-600">
              View and edit your personal and academic information.
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Edit2 size={20} />
            Edit Profile
          </button>
        </div>

        <div className="bg-white shadow rounded-md p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            <div className="mt-4">
              {isEditing ? (
                <>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </>
              ) : (
                <>
                  <p className="text-lg font-medium">Name: {profile.name}</p>
                  <p className="text-lg font-medium">Email: {profile.email}</p>
                </>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">University Information</h2>
            <p className="text-lg font-medium">University: {profile.university}</p>
            <p className="text-lg font-medium">Bio: {isEditing ? (
              <textarea
                value={tempProfile.bio}
                onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                className="mt-1 p-2 border rounded-md w-full"
              />
            ) : profile.bio}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
            <ul className="list-disc pl-5">
              {profile.courses.map((course, index) => (
                <li key={index} className="text-lg font-medium">
                  {course}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
            <ul className="list-disc pl-5">
              {profile.achievements.map((achievement, index) => (
                <li key={index} className="text-lg font-medium">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
