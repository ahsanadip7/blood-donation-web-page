import React, { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import { FaUsers, FaHeart, FaHandHoldingHeart } from 'react-icons/fa'; // Relevant icons

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const data = useLoaderData();

    const { users = [], donationRequests = [] } = data || {};

    return (
        <div className="w-full bg-gray-100 pl-2 p-8">
            {/* Welcome Section */}
            <div className="text-center mb-8 bg-white shadow-md p-8 rounded-lg">
                <h1 className="text-3xl font-bold text-indigo-700">
                    Welcome, {user?.displayName || 'Donor'}!
                </h1>
                <p className="text-lg text-gray-600">
                    Thank you for being part of our community. Your contributions make a difference!
                </p>
            </div>

            {/* Featured Statistics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Total Users Card */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                    <FaUsers className="text-4xl text-indigo-700 mb-4" />
                    <h2 className="text-2xl font-semibold">{users.length}</h2>
                    <p className="text-gray-600">Total Users (Donors)</p>
                </div>

                {/* Total Blood Donation Requests Card */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                    <FaHeart className="text-4xl text-red-600 mb-4" />
                    <h2 className="text-2xl font-semibold">{donationRequests.length}</h2>
                    <p className="text-gray-600">Total Blood Donation Requests</p>
                </div>

                {/* Placeholder for Additional Statistics */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                    <FaHandHoldingHeart className="text-4xl text-green-500 mb-4" />
                    <h2 className="text-2xl font-semibold">---</h2>
                    <p className="text-gray-600">Other Stats (Optional)</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
