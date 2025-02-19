import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
      <div className="text-center p-6 md:p-12 rounded-lg bg-gray-900 shadow-lg">
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <p className="text-xl mb-6">Something went wrong. The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
