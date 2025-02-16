import React, { useContext } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const BloodDonationReq = () => {
    const donationReqs = useLoaderData(); // Fetch data from loader
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    // Filter for pending donation requests
    const pendingRequests = donationReqs.filter(req => req.status === 'pending');

  
    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5 text-center">Pending Donation Requests</h1>

            {/* Check if there are any pending requests */}
            {pendingRequests.length === 0 ? (
                <p className="text-center text-gray-600">No pending donation requests available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pendingRequests.map((request) => (
                        <div
                            key={request._id}
                            className="border rounded-lg shadow-md p-4 bg-white"
                        >
                            <h2 className="text-xl font-semibold mb-2">{request.recipientName}</h2>
                            <p className="text-gray-600 mb-1">
                                <strong>Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Blood Group:</strong> {request.bloodGroup}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Date:</strong> {request.donationDate}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Time:</strong> {request.donationTime}
                            </p>
                            {
                                user ?
                                <Link to={`donationDetails/${request._id}`}>
                                <button
                                   
                                    className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                >
                                    View Details
                                </button>
                                </Link>
                                    :
                                    <Link to='login'>
                                    <button
                                       
                                        className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                    >
                                        View Details
                                    </button>
                                    </Link>
                            }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BloodDonationReq;
