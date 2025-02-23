import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';

const MyDonationReq = () => {
    const { user } = useContext(AuthContext);
    const allReq = useLoaderData();
    const myReqs = allReq.filter((req) => req.requesterEmail === user?.email);

    // State for filtering and pagination
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter requests based on selected status
    const filteredRequests = filterStatus
        ? myReqs.filter((req) => req.status === filterStatus)
        : myReqs;

    // Calculate pagination details
    const totalItems = filteredRequests.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRequests = filteredRequests.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Handle status filtering
    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 p-6 w-full">
            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                    My Donation Requests
                </h2>

                {/* Filter Dropdown */}
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                        Filter by Status:
                    </label>
                    <select
                        className="w-full border rounded p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                        value={filterStatus}
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                {/* Requests Table */}
                <div className="overflow-x-auto">
    <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
            <tr className="bg-indigo-100 dark:bg-indigo-800">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Recipient Name</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Blood Group</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Hospital</th>
            </tr>
        </thead>
        <tbody>
            {paginatedRequests.length > 0 ? (
                paginatedRequests.map((req, index) => (
                    <tr key={req._id} className="text-center bg-white dark:bg-gray-800">
                        <td className="border border-gray-300 px-4 py-2">{startIndex + index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{req.recipientName}</td>
                        <td className="border border-gray-300 px-4 py-2">{req.recipientDistrict}, {req.recipientUpazila}</td>
                        <td className="border border-gray-300 px-4 py-2">{req.donationDate}</td>
                        <td className="border border-gray-300 px-4 py-2">{req.donationTime}</td>
                        <td className="border border-gray-300 px-4 py-2">{req.bloodGroup}</td>
                        <td className="border border-gray-300 px-4 py-2 capitalize">{req.status}</td>
                        <td className="border border-gray-300 px-4 py-2">{req.hospitalName}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="8" className="text-center text-gray-500 py-4 dark:text-gray-400">
                        No requests found.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <button
                            className={`px-4 py-2 border rounded-l ${
                                currentPage === 1
                                    ? 'bg-gray-300 dark:bg-gray-700'
                                    : 'bg-indigo-500 text-white dark:bg-indigo-600'
                            }`}
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            Prev
                        </button>
                        <span className="px-4 py-2 border-t border-b dark:border-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className={`px-4 py-2 border rounded-r ${
                                currentPage === totalPages
                                    ? 'bg-gray-300 dark:bg-gray-700'
                                    : 'bg-indigo-500 text-white dark:bg-indigo-600'
                            }`}
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyDonationReq;
