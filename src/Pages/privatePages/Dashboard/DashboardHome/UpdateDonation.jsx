import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateDonation = () => {
    const updateDonation = useLoaderData(); // Load the donation data
    const navigate = useNavigate();

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
        _id,
    } = updateDonation;

    const handleUpdate = (e) => {
        e.preventDefault();

        const form = e.target;
        const updatedData = {
            recipientName: form.recipientName.value,
            recipientDistrict: form.recipientDistrict.value,
            recipientUpazila: form.recipientUpazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
        };

        fetch(`https://assignment-12-server-omega-six.vercel.app/donationRequests/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Success!', 'Donation request updated successfully.', 'success');
                    navigate('/dashboard'); // Redirect to the dashboard
                }
            })
            .catch((error) => {
                console.error('Error updating donation request:', error);
                Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">Update Donation Request</h2>
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recipient Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Recipient Name</label>
              <input
                type="text"
                name="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
  
            {/* Recipient District */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Recipient District</label>
              <input
                type="text"
                name="recipientDistrict"
                value={recipientDistrict}
                onChange={(e) => setRecipientDistrict(e.target.value)}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
  
            {/* Recipient Upazila */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Recipient Upazila</label>
              <input
                type="text"
                name="recipientUpazila"
                value={recipientUpazila}
                onChange={(e) => setRecipientUpazila(e.target.value)}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
  
            {/* Hospital Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Hospital Name</label>
              <input
                type="text"
                name="hospitalName"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
  
            {/* Full Address */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Full Address</label>
              <input
                type="text"
                name="fullAddress"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
  
            {/* Blood Group */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Blood Group</label>
              <select
                name="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="select select-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
  
            {/* Donation Date */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Donation Date</label>
              <input
                type="date"
                name="donationDate"
                value={donationDate}
                onChange={(e) => setDonationDate(e.target.value)}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
  
            {/* Donation Time */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Donation Time</label>
              <input
                type="time"
                name="donationTime"
                value={donationTime}
                onChange={(e) => setDonationTime(e.target.value)}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
  
            {/* Request Message */}
            <div className="col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Request Message</label>
              <textarea
                name="requestMessage"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                rows="4"
                required
              ></textarea>
            </div>
          </div>
  
          {/* Update Button */}
          <div className="mt-6 text-right">
            <button type="submit" className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600">
              Update Request
            </button>
          </div>
        </form>
      </div>
    );
};

export default UpdateDonation;
