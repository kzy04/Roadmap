import React, { useState } from 'react';
import Header from '../components/Header';
import ForumFilter from '../components/forum/ForumFilter';
import ForumPost from '../components/forum/ForumPost';
import CreatePostModal from '../components/forum/CreatePostModal';
import { forumPosts } from '../data/forumPosts';
import { University } from '../data/universities';
import { PlusCircle } from 'lucide-react';

const Forums = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<University>("All Universities");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredPosts = selectedUniversity === "All Universities"
    ? forumPosts
    : forumPosts.filter(post => post.university === selectedUniversity);

  const handleCreatePost = (newPost: any) => {
    // In a real app, this would make an API call to create the post
    console.log('Creating new post:', newPost);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">University Forums</h1>
            <p className="text-lg text-gray-600">
              Join discussions with fellow students
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusCircle size={20} />
            Create Post
          </button>
        </div>

        <ForumFilter
          selectedUniversity={selectedUniversity}
          onUniversityChange={setSelectedUniversity}
        />

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <ForumPost key={post.id} {...post} />
          ))}
        </div>

        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePost}
        />
      </main>
    </div>
  );
};

export default Forums;