import React from 'react';
import Header from '../components/Header';
import BlogPost from '../components/BlogPost';
import { blogPosts } from '../data/blogPosts';

const Blogs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            University Updates
          </h1>
          <p className="text-lg text-gray-600">
            Stay informed about the latest announcements from top universities
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blogs;