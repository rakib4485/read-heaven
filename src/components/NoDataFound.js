import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoDataFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <img
        src="https://media.giphy.com/media/5YzBeZycrONQ7XgkcB/giphy.gif"
        alt="No Data Found"
        className="w-48 h-48 mb-4 animate-bounce"
      />
      <h1 className="text-4xl font-bold text-red-500">No Data Found</h1>
      <p className="text-lg text-gray-600 mt-2">Oops! We couldn't find any results.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NoDataFound;
