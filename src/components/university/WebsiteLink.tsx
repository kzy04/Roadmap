import React from 'react';

interface WebsiteLinkProps {
  website: string;
}

const WebsiteLink: React.FC<WebsiteLinkProps> = ({ website }) => {
  return (
    <a
      href={`https://${website}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-block text-blue-500 hover:text-blue-700"
    >
      Visit Website
    </a>
  );
};

export default WebsiteLink;
