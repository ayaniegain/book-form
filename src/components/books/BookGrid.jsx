import React from 'react';

const BookGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
      {children}
    </div>
  );
};

export default BookGrid;
