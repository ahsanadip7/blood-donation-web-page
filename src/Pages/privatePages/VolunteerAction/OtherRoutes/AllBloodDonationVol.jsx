import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllBloodDonationVol = () => {
    const donations = useLoaderData()
    const [donationRequests, setDonationRequests] = useState(donations);
    const [currentPage, setCurrentPage] = useState(1);
    const donationsPerPage = 10;

    // Pagination logic
    const totalPages = Math.ceil(donationRequests.length / donationsPerPage);
    const paginatedRequests = donationRequests.slice(
        (currentPage - 1) * donationsPerPage,
        currentPage * donationsPerPage
    );

    // Update donation status (restricted to volunteers)
       // Update donation status
       const handleDonationStatusChange = (donationId, newStatus) => {
        fetch(`http://localhost:5000/donationRequests/${donationId}`, {
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
                    Swal.fire(
                        'Success!',
                        `Donation request status updated to ${newStatus}`,
                        'success'
                    );
                }
            });
    };

    return (
        <div className="p-6 bg-gray-100 w-full">
            <h1 className="text-2xl font-bold mb-4">Volunteer: All Donation Requests</h1>

            {/* Donation Request Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Donor Name</th>
                            <th>Email</th>
                            <th>Blood Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRequests.map((donation) => (
                            <tr key={donation._id}>
                                <td>{donation.requesterName}</td>
                                <td>{donation.requesterEmail}</td>
                                <td>{donation.bloodGroup}</td>
                                <td>{donation.status}</td>
                                <td>
                                    {/* Restricted to status update only */}
                                    <select
                                        value={donation.status}
                                        onChange={(e) =>
                                            handleDonationStatusChange(
                                                donation._id,
                                                e.target.value
                                            )
                                        }
                                        className="select select-bordered"
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
            <div className="flex justify-center items-center mt-4">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`btn btn-sm mx-1 ${
                            currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'
                        }`}
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
