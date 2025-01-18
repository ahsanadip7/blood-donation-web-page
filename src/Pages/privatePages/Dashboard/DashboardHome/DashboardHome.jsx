import React, { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const donorRequest = useLoaderData(); // Fetch all donation requests
  const navigate = useNavigate();

  const userDonorRequest = donorRequest.filter(
    (userRequest) => userRequest.email === user?.email
  ); // Filter requests belonging to the logged-in donor

  const handleStatusChange = (id, newStatus) => {
    // Update the status of a donation request
    console.log(id);
    fetch(`http://localhost:5000/bloodDonor/${id}`, {
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
    // Show confirmation modal before deleting
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
        fetch(`http://localhost:5000/bloodDonor/${id}`, {
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
    <div className="bg-gray-100 p-8 min-h-screen">
      {/* Welcome Section */}
      <div className="text-center mb-8 bg-white shadow-md p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-indigo-700">
          Welcome, {user?.displayName || 'Donor'}!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for being part of our community. Your contributions make a difference!
        </p>
      </div>

      {/* Recent Donation Requests Section */}
      {userDonorRequest.length > 0 && (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Your Recent Donation Requests
          </h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-100">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Recipient Name</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Blood Group</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userDonorRequest.slice(0, 3).map((request, index) => (
                <tr key={request._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {request.district}, {request.upazila}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{request.preferredDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.preferredTime}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.bloodGroup}</td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">{request.status}</td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    {request.status === 'inprogress' && (
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
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => navigate(`/edit-donation-request/${request._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(request._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/donation-request-details/${request._id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* View All Requests Button */}
          <div className="text-right mt-4">
            <button
              className="btn btn-outline btn-primary"
              onClick={() => navigate('/my-donation-requests')}
            >
              View My All Requests
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
