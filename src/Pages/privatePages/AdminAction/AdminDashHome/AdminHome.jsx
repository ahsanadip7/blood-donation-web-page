import React, { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import { FaUsers, FaHeart, FaHandHoldingUsd } from 'react-icons/fa'; // Relevant icons

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const data = useLoaderData();

    const { users = [], donationRequests = [], totalFunds = 0 } = data || {};

    return (
        <div className="w-full bg-gray-100 dark:bg-gray-800 pl-2 p-8">
            {/* Welcome Section */}
            <div className="text-center mb-8 bg-white dark:bg-gray-900 shadow-lg p-8 rounded-2xl">
                <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                    Welcome, {user?.displayName || 'Admin'}!
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                    Together, we’re building a stronger community. Keep up the great work!
                </p>
            </div>

            {/* Featured Statistics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Total Users Card */}
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center flex flex-col items-center">
                    <FaUsers className="text-5xl text-indigo-700 dark:text-indigo-400 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{users.length}</h2>
                    <p className="text-gray-600 dark:text-gray-300">Total Donors</p>
                </div>

                {/* Total Funds Card */}
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center flex flex-col items-center">
                    <FaHandHoldingUsd className="text-5xl text-green-600 dark:text-green-400 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">${totalFunds.toFixed(2)}</h2>
                    <p className="text-gray-600 dark:text-gray-300">Total Funds Collected</p>
                </div>

                {/* Total Blood Donation Requests Card */}
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center flex flex-col items-center">
                    <FaHeart className="text-5xl text-red-600 dark:text-red-400 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{donationRequests.length}</h2>
                    <p className="text-gray-600 dark:text-gray-300">Blood Donation Requests</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
