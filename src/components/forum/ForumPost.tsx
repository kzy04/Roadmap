import React from 'react';
import { MessageSquare, ThumbsUp, Tag } from 'lucide-react';
import type { ForumPost as ForumPostType } from '../../data/forumPosts';

const ForumPost = ({ title, content, author, university, date, likes, replies, tags }: ForumPostType) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          {university}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
            <Tag size={14} />
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span>Posted by {author}</span>
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ThumbsUp size={16} />
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={16} />
            {replies}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;