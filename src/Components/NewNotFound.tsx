import React from 'react';
import { Link } from 'react-router-dom';

const NewNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-9xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
        404
      </h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <p className="text-gray-400 mt-2">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-8 px-6 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
        Go Home
      </Link>
    </div>
  );
};

export default NewNotFound;
