import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const ReqDetails = () => {
    const donationReq = useLoaderData();
    const {user} = useContext(AuthContext)
    console.log(user);
    const [showModal, setShowModal] = useState(false);

    // Assuming the user's information is fetched or stored in localStorage/sessionStorage
    const loggedInUser = {
        name : user?.displayName, // Replace with actual user name
        email: user?.email, // Replace with actual user email
    };

    const handleConfirmDonation = () => {
        fetch(`https://assignment-12-server-omega-six.vercel.app/donationRequests/${donationReq._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'inprogress' }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Success!', 'Donation status updated to inprogress.', 'success');
                    setShowModal(false);
                } else {
                    Swal.fire('Error!', 'Could not update the donation status.', 'error');
                }
            })
            .catch((err) => {
                console.error(err);
                Swal.fire('Error!', 'An error occurred while updating the status.', 'error');
            });
    };

    return (
        <div className="p-5 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-5 text-center text-gray-800 dark:text-white">Donation Request Details</h1>
        <div className="border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            <p className="text-lg mb-2">
                <strong>Recipient Name:</strong> {donationReq.recipientName}
            </p>
            <p className="text-lg mb-2">
                <strong>Location:</strong> {donationReq.recipientDistrict}, {donationReq.recipientUpazila}
            </p>
            <p className="text-lg mb-2">
                <strong>Blood Group:</strong> {donationReq.bloodGroup}
            </p>
            <p className="text-lg mb-2">
                <strong>Date:</strong> {donationReq.donationDate}
            </p>
            <p className="text-lg mb-2">
                <strong>Time:</strong> {donationReq.donationTime}
            </p>
            <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 mt-4 transition-colors duration-200"
            >
                Donate
            </button>
        </div>
    
        {/* Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Confirm Donation</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">Donor Name</label>
                            <input
                                type="text"
                                value={loggedInUser.name}
                                readOnly
                                className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">Donor Email</label>
                            <input
                                type="email"
                                value={loggedInUser.email}
                                readOnly
                                className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleConfirmDonation}
                            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            Confirm Donation
                        </button>
                    </form>
                    <button
                        onClick={() => setShowModal(false)}
                        className="mt-4 w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        )}
    </div>
    
    );
};

export default ReqDetails;
