import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewDetails = () => {
    const donationDetails = useLoaderData();
    const {
        bloodGroup,
        donationDate,
        donationTime,
        fullAddress,
        hospitalName,
        recipientDistrict,
        recipientName,
        recipientUpazila,
        requestMessage,
        requesterEmail, // Add missing email field
    } = donationDetails;

    return (
        <div className="bg-green-50 w-full flex items-center justify-center px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                    Donation Request Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            Recipient Name: <span className="text-indigo-600">{recipientName}</span>
                        </p>
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            Blood Group: <span className="text-indigo-600">{bloodGroup}</span>
                        </p>
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            District: <span className="text-indigo-600">{recipientDistrict}</span>
                        </p>
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            Upazila: <span className="text-indigo-600">{recipientUpazila}</span>
                        </p>
                    </div>

                    {/* Right Column */}
                    <div>
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            Hospital Name: <span className="text-indigo-600">{hospitalName}</span>
                        </p>
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            Full Address: <span className="text-indigo-600">{fullAddress}</span>
                        </p>
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            Email: <span className="text-indigo-600">{requesterEmail}</span>
                        </p>
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            Preferred Date: <span className="text-indigo-600">{donationDate}</span>
                        </p>
                        <p className="text-lg font-bold text-gray-700 mb-2">
                            Preferred Time: <span className="text-indigo-600">{donationTime}</span>
                        </p>
                    </div>
                </div>

                {/* Request Message */}
                <div className="mt-8">
                    <p className="text-lg font-bold text-gray-700 mb-2">
                        Request Message:
                    </p>
                    <p className="text-gray-600 border-l-4 border-indigo-600 pl-4">
                        {requestMessage}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
