import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

const SearchPage = () => {
    // Fetching donation requests from the loader
    const donationRequests = useLoaderData();
    console.log(donationRequests);

    const [bloodGroup, setBloodGroup] = useState('');
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [filteredDonors, setFilteredDonors] = useState([]);
    console.log(filteredDonors);

    useEffect(() => {
        // Filter donation requests on component load
        setFilteredDonors(donationRequests);
    }, [donationRequests]);

    const handleSearch = (e) => {
        e.preventDefault();
    
        // Normalize the inputs to lowercase for case-insensitive comparison
        const normalizedBloodGroup = bloodGroup.toLowerCase();
        const normalizedDistrict = district.toLowerCase();
        const normalizedUpazila = upazila.toLowerCase();
    
        // Filter donation requests based on search criteria
        const filtered = donationRequests.filter((donor) => {
            const donorBloodGroup = donor?.bloodGroup?.toLowerCase();
            const donorDistrict = donor?.recipientDistrict?.toLowerCase();
            const donorUpazila = donor?.recipientUpazila?.toLowerCase();
    
            return (
                (bloodGroup ? donorBloodGroup === normalizedBloodGroup : true) &&
                (district ? donorDistrict === normalizedDistrict : true) &&
                (upazila ? donorUpazila === normalizedUpazila : true)
            );
        });
    
        setFilteredDonors(filtered);
    };
    

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5 text-center">Search Donors</h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-4 max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
                <div>
                    <label htmlFor="bloodGroup" className="block text-lg font-semibold mb-2">
                        Blood Group
                    </label>
                    <select
                        id="bloodGroup"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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

                <div>
                    <label htmlFor="district" className="block text-lg font-semibold mb-2">
                        District
                    </label>
                    <select
                        id="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="">Select District</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattogram">Chattogram</option>
                        <option value="Khulna">Khulna</option>
                        {/* Add more districts as needed */}
                    </select>
                </div>

                <div>
                    <label htmlFor="upazila" className="block text-lg font-semibold mb-2">
                        Upazila
                    </label>
                    <select
                        id="upazila"
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="">Select Upazila</option>
                        <option value="Dhanmondi">Dhanmondi</option>
                        <option value="Mirpur">Mirpur</option>
                        <option value="Mohammadpur">Mohammadpur</option>
                        {/* Add more upazilas as needed */}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 shadow-md"
                >
                    Search
                </button>
            </form>

            {/* Donors List */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-5 text-center">Donors List</h2>
                {filteredDonors.length === 0 ? (
                    <p className="text-center text-gray-600">No donors found. Please search using the form above.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredDonors.map((donor) => (
                            <div key={donor._id} className="border rounded-lg shadow-md p-4 bg-white">
                                <h3 className="text-xl font-semibold mb-2">{donor.recipientName}</h3>
                                <p className="text-gray-600 mb-1">
                                    <strong>Blood Group:</strong> {donor.bloodGroup}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <strong>District:</strong> {donor.recipientDistrict}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <strong>Upazila:</strong> {donor.recipientUpazila}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Contact:</strong> {donor.requesterEmail}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
