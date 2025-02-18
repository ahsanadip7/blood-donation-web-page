import React, { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import { FaUsers, FaHeart, FaHandHoldingHeart, FaHandHoldingUsd } from 'react-icons/fa'; 

const VolunteerHome = () => {
    const { user } = useContext(AuthContext);
    const data = useLoaderData();

    const { users = [], donationRequests = [], totalFunds = 0 } = data || {};
    return (
        <div className="w-full bg-gray-100 dark:bg-gray-900 pl-4 pr-4 pb-10">
            {/* Welcome Section */}
            <div className="text-center mb-12 bg-white dark:bg-gray-800 shadow-md p-8 rounded-lg">
                <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
                    Welcome, {user?.displayName || 'Donor'}!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Thank you for being part of our community. Your contributions make a difference!
                </p>
            </div>

            {/* Featured Statistics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Total Users Card */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 flex flex-col items-center text-center">
                    <FaUsers className="text-4xl text-indigo-700 dark:text-indigo-300 mb-6" />
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{users.length}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Total Users (Donors)</p>
                </div>

                {/* Total Blood Donation Requests Card */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 flex flex-col items-center text-center">
                    <FaHeart className="text-4xl text-red-600 dark:text-red-400 mb-6" />
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{donationRequests.length}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Total Blood Donation Requests</p>
                </div>

                {/* Total Funds Card */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 text-center flex flex-col items-center">
                    <FaHandHoldingUsd className="text-5xl text-green-600 dark:text-green-400 mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">${totalFunds.toFixed(2)}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Total Funds Collected</p>
                </div>

                {/* Placeholder for Additional Statistics */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 flex flex-col items-center text-center">
                    <FaHandHoldingHeart className="text-4xl text-green-500 dark:text-green-400 mb-6" />
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">---</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Other Stats (Optional)</p>
                </div>
            </div>
        </div>
    );
};

export default VolunteerHome;
