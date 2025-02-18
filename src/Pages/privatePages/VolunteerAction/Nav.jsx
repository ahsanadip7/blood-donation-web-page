import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <ul className="w-60 text-center font-semibold menu bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-full rounded-lg shadow-md">
                {/* Home */}
                <Link to='/'>
                    <li className="hover:bg-gray-100 dark:hover:bg-gray-700 py-3 px-4 rounded-md transition-all">
                        <a className="flex items-center justify-start space-x-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="text-lg">Home</span>
                        </a>
                    </li>
                </Link>

                <div className="divider m-0"></div>

                {/* Dashboard */}
                <Link to='/dashboard'>
                    <li className="hover:bg-gray-100 dark:hover:bg-gray-700 py-3 px-4 rounded-md transition-all">
                        <a className="flex items-center justify-start space-x-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 4h18M3 12h18M3 20h18" />
                            </svg>
                            <span className="text-lg">Dashboard</span>
                        </a>
                    </li>
                </Link>

                <div className="divider m-0"></div>

                {/* All Blood Donation */}
                <Link to='/allDonation'>
                    <li className="hover:bg-gray-100 dark:hover:bg-gray-700 py-3 px-4 rounded-md transition-all">
                        <a className="flex items-center justify-start space-x-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 2l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            <span className="text-lg">All Blood Donation</span>
                        </a>
                    </li>
                </Link>

                <div className="divider m-0"></div>

                {/* Content Management */}
                <Link to='/contentManagement'>
                    <li className="hover:bg-gray-100 dark:hover:bg-gray-700 py-3 px-4 rounded-md transition-all">
                        <a className="flex items-center justify-start space-x-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 19V6h12v13H6z" />
                            </svg>
                            <span className="text-lg">Content Management</span>
                        </a>
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default Nav;
