import React, { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Not Found - Instagram';
  }, []);

  return (
    <div className='bg-gray-background'>
      <div className='max-w-screen-lg mx-auto'>
        <p className='text-2xl text-center'>Not Found!</p>
      </div>
    </div>
  );
};

export default NotFound;
