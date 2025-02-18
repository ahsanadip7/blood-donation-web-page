import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    console.log(user);

    const userDb = useLoaderData();
    const userDetails = userDb.find(u => u.email === user?.email);
    console.log(userDetails);
    const name = userDetails.name;
    const email = userDetails.email;
    const photo = userDetails.photo;
    const district = userDetails.district;
    const upazilla = userDetails.upazilla;

    // Mock data fetched from the database
    const [profileData, setProfileData] = useState({
        name: name,
        email: email,
        avatarUrl: photo,
        district: district,
        upazila: upazilla,
        bloodGroup: "your blood group",
    });

    // State to toggle edit mode
    const [isEditable, setIsEditable] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle save button click
    const handleSave = () => {
        // Simulate saving data to the database
        console.log("Saving updated profile:", profileData);

        // Show success alert
        Swal.fire({
            title: "Profile Updated",
            text: "Your profile information has been updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
        });

        // Disable edit mode after saving
        setIsEditable(false);
    };

    return (
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            {/* Avatar and Edit Button */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src={profileData.avatarUrl}
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profileData.name}</h1>
                        <p className="text-gray-600 dark:text-gray-300">{profileData.email}</p>
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setIsEditable(!isEditable)}
                >
                    {isEditable ? "Cancel" : "Edit"}
                </button>
            </div>

            {/* Profile Form */}
            <form className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        className="input input-bordered w-full text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                        disabled={!isEditable}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        className="input input-bordered w-full text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                        disabled
                    />
                </div>

                {/* Avatar URL */}
                <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">Avatar URL</label>
                    <input
                        type="url"
                        name="avatarUrl"
                        value={profileData.avatarUrl}
                        onChange={handleChange}
                        className="input input-bordered w-full text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                        disabled={!isEditable}
                    />
                </div>

                {/* District */}
                <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">District</label>
                    <input
                        type="text"
                        name="district"
                        value={profileData.district}
                        onChange={handleChange}
                        className="input input-bordered w-full text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                        disabled={!isEditable}
                    />
                </div>

                {/* Upazila */}
                <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">Upazila</label>
                    <input
                        type="text"
                        name="upazila"
                        value={profileData.upazila}
                        onChange={handleChange}
                        className="input input-bordered w-full text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                        disabled={!isEditable}
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">Blood Group</label>
                    <select
                        name="bloodGroup"
                        value={profileData.bloodGroup}
                        onChange={handleChange}
                        className="select select-bordered w-full text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                        disabled={!isEditable}
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

                {/* Save Button */}
                {isEditable && (
                    <button
                        type="button"
                        className="btn btn-success w-full"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                )}
            </form>
        </div>
    );
};

export default ProfilePage;
