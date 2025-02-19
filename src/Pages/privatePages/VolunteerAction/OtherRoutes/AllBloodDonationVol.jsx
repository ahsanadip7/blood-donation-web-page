import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllBloodDonationVol = () => {
    const donations = useLoaderData();
    const [donationRequests, setDonationRequests] = useState(donations);
    const [currentPage, setCurrentPage] = useState(1);
    const donationsPerPage = 5;

    const totalPages = Math.ceil(donationRequests.length / donationsPerPage);
    const paginatedRequests = donationRequests.slice(
        (currentPage - 1) * donationsPerPage,
        currentPage * donationsPerPage
    );

    const handleDonationStatusChange = (donationId, newStatus) => {
        fetch(`https://assignment-12-server-omega-six.vercel.app/donationRequests/${donationId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    setDonationRequests((prevRequests) =>
                        prevRequests.map((donation) =>
                            donation._id === donationId
                                ? { ...donation, status: newStatus }
                                : donation
                        )
                    );
                    Swal.fire('Success!', `Status updated to ${newStatus}`, 'success');
                }
            });
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 w-full">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4 text-center">
                Volunteer: All Donation Requests
            </h1>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                        <tr className="bg-indigo-500 dark:bg-indigo-700 text-white">
                            <th className="p-3 text-left">Donor Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-center">Blood Type</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRequests.map((donation) => (
                            <tr key={donation._id} className="border-b dark:border-gray-700">
                                <td className="p-3 text-gray-800 dark:text-gray-300">{donation.requesterName}</td>
                                <td className="p-3 text-gray-800 dark:text-gray-300">{donation.requesterEmail}</td>
                                <td className="p-3 text-center font-semibold text-red-600 dark:text-red-400">{donation.bloodGroup}</td>
                                <td className="p-3 text-center capitalize font-medium text-gray-700 dark:text-gray-300">
                                    {donation.status}
                                </td>
                                <td className="p-3 text-center">
                                    <select
                                        value={donation.status}
                                        onChange={(e) => handleDonationStatusChange(donation._id, e.target.value)}
                                        className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Declined">Declined</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded-md text-sm md:text-base transition-all shadow-md 
                        ${currentPage === index + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllBloodDonationVol;