import React, { useContext, useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon

const BloodDonationReq = () => {
  const [loading, setLoading] = useState(true); // State to track loading
  const donationReqs = useLoaderData(); // Fetch data from loader
  const { user } = useContext(AuthContext);

  // Filter for pending donation requests
  const pendingRequests = donationReqs.filter(req => req.status === 'pending');

  useEffect(() => {
    // Simulate data loading or API call
    if (donationReqs) {
      setLoading(false); // Stop loading once data is available
    }
  }, [donationReqs]);

  return (
    <div className="p-5 bg-white dark:bg-gray-900">
      <h1 className="text-3xl text-gray-800 dark:text-white font-bold mb-5 text-center">Pending Donation Requests</h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
          <span className="text-lg text-gray-600">Loading data...</span>
        </div>
      ) : (
        // Displaying the donation requests if not loading
        <>
          {/* Check if there are any pending requests */}
          {pendingRequests.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">No pending donation requests available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pendingRequests.map((request) => (
                <div
                  key={request._id}
                  className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-xl font-semibold mb-2">{request?.recipientName}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    <strong>Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    <strong>Blood Group:</strong> {request.bloodGroup}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    <strong>Date:</strong> {request.donationDate}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    <strong>Time:</strong> {request.donationTime}
                  </p>

                  {/* Conditional rendering based on user authentication */}
                  {user ? (
                    <Link to={`donationDetails/${request._id}`}>
                      <button
                        className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </Link>
                  ) : (
                    <Link to='/login'>
                      <button
                        className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BloodDonationReq;
