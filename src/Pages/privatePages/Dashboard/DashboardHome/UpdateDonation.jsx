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
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">Update Donation Request</h2>
            <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Recipient Name</label>
                        <input
                            type="text"
                            name="recipientName"
                            defaultValue={recipientName}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Recipient District</label>
                        <input
                            type="text"
                            name="recipientDistrict"
                            defaultValue={recipientDistrict}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Recipient Upazila</label>
                        <input
                            type="text"
                            name="recipientUpazila"
                            defaultValue={recipientUpazila}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Hospital Name</label>
                        <input
                            type="text"
                            name="hospitalName"
                            defaultValue={hospitalName}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Full Address</label>
                        <input
                            type="text"
                            name="fullAddress"
                            defaultValue={fullAddress}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Blood Group</label>
                        <select
                            name="bloodGroup"
                            defaultValue={bloodGroup}
                            className="select select-bordered w-full"
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

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Donation Date</label>
                        <input
                            type="date"
                            name="donationDate"
                            defaultValue={donationDate}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Donation Time</label>
                        <input
                            type="time"
                            name="donationTime"
                            defaultValue={donationTime}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Request Message</label>
                        <textarea
                            name="requestMessage"
                            defaultValue={requestMessage}
                            className="textarea textarea-bordered w-full"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <button type="submit" className="btn btn-primary">
                        Update Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateDonation;
