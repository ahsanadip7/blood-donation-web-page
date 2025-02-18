import React, { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const donorRequest = useLoaderData(); // Fetch all donation requests
    const navigate = useNavigate();

    const userDonorRequest = donorRequest.filter(
        (userRequest) => userRequest.requesterEmail === user?.email
    ); // Filter requests belonging to the logged-in donor

    const handleStatusChange = (id, newStatus) => {
        fetch(`https://assignment-12-server-omega-six.vercel.app/donationRequests/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Success!', `Status changed to ${newStatus}.`, 'success');
                    window.location.reload();
                }
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignment-12-server-omega-six.vercel.app/donationRequests/${id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your request has been deleted.', 'success');
                            window.location.reload();
                        }
                    });
            }
        });
    };

    return (
        <div className="w-full bg-gray-100 dark:bg-gray-900 sm:px-6 lg:px-8 pt-8 pb-12">
            {/* Welcome Section */}
            <div className="text-center mb-12 bg-white dark:bg-gray-800 shadow-md p-8 rounded-lg">
                <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
                    Welcome, {user?.displayName || 'Donor'}!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Thank you for being part of our community. Your contributions make a difference!
                </p>
            </div>

            {/* Recent Donation Requests Section */}
            {userDonorRequest.length > 0 && (
                <div className="bg-white dark:bg-gray-800 shadow-md p-8 rounded-lg">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                        Your Recent Donation Requests
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-indigo-100 dark:bg-indigo-800">
                                    <th className="border border-gray-300 px-4 py-3">#</th>
                                    <th className="border border-gray-300 px-4 py-3">Recipient Name</th>
                                    <th className="border border-gray-300 px-4 py-3">Location</th>
                                    <th className="border border-gray-300 px-4 py-3">Date</th>
                                    <th className="border border-gray-300 px-4 py-3">Time</th>
                                    <th className="border border-gray-300 px-4 py-3">Blood Group</th>
                                    <th className="border border-gray-300 px-4 py-3">Status</th>
                                    <th className="border border-gray-300 px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDonorRequest.slice(0, 3).map((request, index) => (
                                    <tr key={request._id} className="text-center">
                                        <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-3">{request.recipientName}</td>
                                        <td className="border border-gray-300 px-4 py-3">
                                            {request.recipientDistrict}, {request.recipientUpazila}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3">{request.donationDate}</td>
                                        <td className="border border-gray-300 px-4 py-3">{request.donationTime}</td>
                                        <td className="border border-gray-300 px-4 py-3">{request.bloodGroup}</td>
                                        <td className="border border-gray-300 px-4 py-3 capitalize">
                                            {request.status}
                                            <div className="grid gap-2 mt-2">
                                                {request.status === 'pending' && (
                                                    <>
                                                        <button
                                                            className="btn btn-sm btn-success"
                                                            onClick={() => handleStatusChange(request._id, 'done')}
                                                        >
                                                            Done
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-error"
                                                            onClick={() => handleStatusChange(request._id, 'canceled')}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3 space-x-2">
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                <Link to={`updateDonation/${request._id}`}>
                                                    <button className="btn btn-sm btn-warning">Edit</button>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(request._id)}
                                                >
                                                    Delete
                                                </button>
                                                <Link to={`viewDetails/${request._id}`}>
                                                    <button className="btn btn-sm btn-primary">View</button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* View All Requests Button */}
                    <div className="mt-6 text-right">
                        <Link to="/allRequests">
                            <button className="btn btn-sm btn-outline-indigo">View All Requests</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;
