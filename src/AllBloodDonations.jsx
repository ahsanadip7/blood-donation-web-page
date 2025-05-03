import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';

const AllBloodDonations = () => {
    const allDonationData = useLoaderData();
    const [currentPage, setCurrentPage] = useState(1);
    const donationsPerPage = 9;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
            </div>
        );
    }

    const indexOfLastDonation = currentPage * donationsPerPage;
    const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
    const currentDonations = allDonationData.slice(indexOfFirstDonation, indexOfLastDonation);
    const totalPages = Math.ceil(allDonationData.length / donationsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-5 min-h-screen bg-white dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">All Blood Donations</h1>

            {allDonationData.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300">No donations available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {currentDonations.map((donation, index) => (
                        <motion.div
                            key={donation._id}
                            className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-6 border hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <h2 className="text-2xl font-semibold mb-3">{donation.recipientName}</h2>
                            <div className="space-y-1 text-sm">
                                <p><span className="font-semibold">Location:</span> {donation.recipientDistrict}, {donation.recipientUpazila}</p>
                                <p><span className="font-semibold">Blood Group:</span> {donation.bloodGroup}</p>
                                <p><span className="font-semibold">Date:</span> {donation.donationDate}</p>
                                <p><span className="font-semibold">Time:</span> {donation.donationTime}</p>
                                <p><span className="font-semibold">Hospital:</span> {donation.hospitalName}</p>
                                <p><span className="font-semibold">Message:</span> {donation.requestMessage}</p>
                                <p><span className="font-semibold">Status:</span> {donation.status}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 flex-wrap gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-lg ${
                            currentPage === index + 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllBloodDonations;
