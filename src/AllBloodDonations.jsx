import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

const AllBloodDonations = () => {
    const allDonationData = useLoaderData(); // Fetch data using useLoaderData
    const [currentPage, setCurrentPage] = useState(1);
    const donationsPerPage = 9;
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate a delay for data fetching
        setTimeout(() => setLoading(false), 1000); // Set loading to false after 1 second
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
            </div>
        );
    }

    // Get the index of the first and last donation on the current page
    const indexOfLastDonation = currentPage * donationsPerPage;
    const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;

    // Get the donations for the current page
    const currentDonations = allDonationData.slice(indexOfFirstDonation, indexOfLastDonation);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(allDonationData.length / donationsPerPage);

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5 text-center">All Blood Donations</h1>

            {/* Check if data is available */}
            {allDonationData.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300">No donations available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                    {/* Map over the current donations */}
                    {currentDonations.map((donation) => (
                        <div key={donation._id} className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
                            <h2 className="text-xl font-semibold mb-2">{donation.recipientName}</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                <strong>Location:</strong> {donation.recipientDistrict}, {donation.recipientUpazila}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                <strong>Blood Group:</strong> {donation.bloodGroup}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                <strong>Date:</strong> {donation.donationDate}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                <strong>Time:</strong> {donation.donationTime}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                <strong>Hospital:</strong> {donation.hospitalName}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                <strong>Message:</strong> {donation.requestMessage}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                <strong>Status:</strong> {donation.status}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-5">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg mr-2 disabled:bg-gray-400"
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg ml-2 disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllBloodDonations;
