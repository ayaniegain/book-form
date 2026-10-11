import React, { useState } from 'react';
import fallbackCover from '../../assets/book-cover-fallback.svg';

const BookCard = ({ work, loggedDate, isChecked, onToggleCheck }) => {
  // State handles fallback swap if the network image fails to load
  const [imgSrc, setImgSrc] = useState(
    work.cover_id
      ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
      : fallbackCover
  );

  const authorsList = work.author_names?.join(', ') || 'Unknown Author';

  const formattedDate = new Date(loggedDate.split(',')).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article 
      className={`relative group bg-white border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
        isChecked ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200'
      }`}
    >
      {/* Checkbox Overlay */}
      <div className="absolute top-3 left-3 z-10">
        <label className="flex items-center justify-center cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onToggleCheck}
            className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2 transition duration-150 cursor-pointer accent-blue-600"
          />
        </label>
      </div>

      {/* Book Cover Frame Container */}
      <div className="h-72 bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100 relative">
        <img 
          src={imgSrc} 
          alt={`${work.title} Cover`} 
          loading="lazy" 
          // If the CDN returns a 404 or fails, swap the source to the vector fallback
          onError={() => {
            if (imgSrc !== fallbackCover) setImgSrc(fallbackCover);
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isChecked && <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 h-[2.6rem] mb-1 group-hover:text-blue-600 transition-colors" title={work.title}>
          {work.title}
        </h3>
        <p className="text-xs text-gray-500 truncate mb-4">by {authorsList}</p>
        
        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-1.5 text-[11px] text-gray-400">
          <div className="flex justify-between">
            <span>Published:</span>
            <span className="font-medium text-gray-600">{work.first_publish_year || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>Added to Log:</span>
            <span className="font-medium text-gray-600">{formattedDate}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
