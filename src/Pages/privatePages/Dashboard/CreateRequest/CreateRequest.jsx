import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const CreateRequest = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        recipientName: '',
        recipientDistrict: '',
        recipientUpazila: '',
        hospitalName: '',
        fullAddress: '',
        bloodGroup: '',
        donationDate: '',
        donationTime: '',
        requestMessage: '',
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const donationRequest = {
            ...formData,
            requesterName: user.displayName,
            requesterEmail: user.email,
            status: 'pending', // Set status as pending by default
        };

        fetch('https://assignment-12-server-omega-six.vercel.app/donationRequests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donationRequest),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Request Created',
                        text: 'Your donation request has been created successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    navigate('/dashboard');
                }
            })
            .catch((error) => console.error('Error creating donation request:', error));
    };

    return (
        <div className={`min-h-screen w-full flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-800`}>
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 w-full"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-300">
                    Create Donation Request
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Requester Name (Read-Only) */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Requester Name
                        </label>
                        <input
                            type="text"
                            name="requesterName"
                            value={user?.displayName || ''}
                            readOnly
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Requester Email (Read-Only) */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Requester Email
                        </label>
                        <input
                            type="email"
                            name="requesterEmail"
                            value={user?.email || ''}
                            readOnly
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Recipient Name */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Recipient Name
                        </label>
                        <input
                            type="text"
                            name="recipientName"
                            value={formData.recipientName}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Recipient District */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Recipient District
                        </label>
                        <select
                            name="recipientDistrict"
                            value={formData.recipientDistrict}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select District</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chittagong">Chittagong</option>
                            <option value="Sylhet">Sylhet</option>
                            <option value="Khulna">Khulna</option>
                        </select>
                    </div>

                    {/* Recipient Upazila */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Recipient Upazila
                        </label>
                        <select
                            name="recipientUpazila"
                            value={formData.recipientUpazila}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select Upazila</option>
                            <option value="Savar">Savar</option>
                            <option value="Mirpur">Mirpur</option>
                            <option value="Gulshan">Gulshan</option>
                            <option value="Motijheel">Motijheel</option>
                        </select>
                    </div>

                    {/* Hospital Name */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Hospital Name
                        </label>
                        <input
                            type="text"
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Full Address */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Full Address
                        </label>
                        <input
                            type="text"
                            name="fullAddress"
                            value={formData.fullAddress}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Blood Group
                        </label>
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select Blood Group</option>
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
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Donation Date
                        </label>
                        <input
                            type="date"
                            name="donationDate"
                            value={formData.donationDate}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Donation Time */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Donation Time
                        </label>
                        <input
                            type="time"
                            name="donationTime"
                            value={formData.donationTime}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Request Message */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Request Message
                        </label>
                        <textarea
                            name="requestMessage"
                            value={formData.requestMessage}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                        Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateRequest;
