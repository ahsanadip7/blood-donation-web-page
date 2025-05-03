import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const userDb = useLoaderData();
    const userDetails = userDb.find(u => u.email === user?.email);

    const [profileData, setProfileData] = useState({
        name: userDetails?.name || "",
        email: userDetails?.email || "",
        avatarUrl: userDetails?.photo || "",
        district: userDetails?.district || "",
        upazila: userDetails?.upazilla || "",
        bloodGroup: "your blood group",
    });

    const [isEditable, setIsEditable] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Saving profile:", profileData);
        Swal.fire({
            title: "Profile Updated",
            text: "Your profile information has been updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
        });
        setIsEditable(false);
    };

    return (
        <div className=" mx-auto my-10 p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl transition-colors">
            {/* Top Section: Avatar and Edit Button */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src={profileData.avatarUrl}
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{profileData.name}</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{profileData.email}</p>
                    </div>
                </div>
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    onClick={() => setIsEditable(!isEditable)}
                >
                    {isEditable ? "Cancel" : "Edit"}
                </button>
            </div>

            {/* Form Fields */}
            <form className="space-y-5">
                {[
                    { label: "Name", type: "text", name: "name", value: profileData.name },
                    { label: "Email", type: "email", name: "email", value: profileData.email, disabled: true },
                    { label: "Avatar URL", type: "url", name: "avatarUrl", value: profileData.avatarUrl },
                    { label: "District", type: "text", name: "district", value: profileData.district },
                    { label: "Upazila", type: "text", name: "upazila", value: profileData.upazila }
                ].map((field, idx) => (
                    <div key={idx}>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            disabled={field.disabled || !isEditable}
                            className={`input input-bordered w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
                        />
                    </div>
                ))}

                {/* Blood Group */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Blood Group
                    </label>
                    <select
                        name="bloodGroup"
                        value={profileData.bloodGroup}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className="select select-bordered w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    >
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>

                {/* Save Button */}
                {isEditable && (
                    <button
                        type="button"
                        onClick={handleSave}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
                    >
                        Save Changes
                    </button>
                )}
            </form>
        </div>
    );
};

export default ProfilePage;
