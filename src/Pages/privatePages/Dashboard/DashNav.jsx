import React from 'react';
import { Link } from 'react-router-dom';

const DashNav = () => {
  return (
    <ul className="lg:w-60 w-full h-full text-center font-bold menu bg-white dark:bg-gray-800 rounded-box shadow-md">

      {/* Logo Section */}
      <div className="py-4 px-6 mb-4">
        <Link to="/" className="flex justify-center items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Blood Donation</span>
        </Link>
      </div>

      {/* Links Section */}
      <div className="flex flex-wrap lg:grid lg:grid-cols-1 lg:gap-4">
        <div>
          <Link to='/dashboard'>
            <li className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
              <a className="flex items-center justify-center space-x-3 text-gray-900 dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Dashboard Home</span>
              </a>
            </li>
          </Link>

          <div className="divider m-0"></div>
        </div>

        <div>
          <Link to='profile'>
            <li className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
              <a className="flex items-center justify-center space-x-3 text-gray-900 dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Profile Page</span>
              </a>
            </li>
          </Link>

          <div className="divider m-0"></div>
        </div>

        <div>
          <Link to='createRequest'>
            <li className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
              <a className="flex items-center justify-center space-x-3 text-gray-900 dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Create Request</span>
              </a>
            </li>
          </Link>

          <div className="divider m-0"></div>
        </div>

        <div>
          <Link to='myDonationReq'>
            <li className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
              <a className="flex items-center justify-center space-x-3 text-gray-900 dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>My Donation Requests</span>
              </a>
            </li>
          </Link>
        </div>
      </div>

    </ul>
  );
};

export default DashNav;
