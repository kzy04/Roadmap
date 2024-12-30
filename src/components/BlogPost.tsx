import React from 'react';
import Image from "next/image";
import { Calendar, School } from 'lucide-react';


interface BlogPostProps {
  title: string;
  university: string;
  date: string;
  content: string;
  imageUrl: string;
}

const BlogPost = ({ title, university, date, content, imageUrl }: BlogPostProps) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={imageUrl} alt={title} width={600} height={400} />
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <School size={16} />
            {university}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {date}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
    </article>
  );
};

export default BlogPost;