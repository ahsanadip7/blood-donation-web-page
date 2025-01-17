import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BloodDonationRegistration = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatarUrl: '',
    bloodGroup: '',
    district: '',
    upazila: '',
    dateOfBirth: null, // Optional field for date of birth
    password: '',
    confirmPassword: '',
    role: 'donor', // Default role
    status: 'active', // Default status
  });

  const districts = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna']; // Example districts
  const upazilas = ['Upazila 1', 'Upazila 2', 'Upazila 3']; // Example upazilas
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']; // Blood groups

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle avatar upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_IMAGEBB_API_KEY', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setFormData({ ...formData, avatarUrl: data.data.url });
      } catch (error) {
        Swal.fire('Error', 'Failed to upload avatar.', 'error');
      }
    }
  };

  // Handle form validation
  const validateForm = () => {
    const { name, email, bloodGroup, district, upazila, password, confirmPassword } = formData;

    if (!name.trim()) return Swal.fire('Error', 'Name is required.', 'error');
    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return Swal.fire('Error', 'Valid email is required.', 'error');
    if (!bloodGroup) return Swal.fire('Error', 'Please select a blood group.', 'error');
    if (!district) return Swal.fire('Error', 'Please select a district.', 'error');
    if (!upazila) return Swal.fire('Error', 'Please select an upazila.', 'error');
    if (!password || password.length < 6)
      return Swal.fire('Error', 'Password must be at least 6 characters long.', 'error');
    if (password !== confirmPassword)
      return Swal.fire('Error', 'Passwords do not match.', 'error');

    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { name, email, avatarUrl, bloodGroup, district, upazila, role, status } = formData;

    const registrationData = {
      name,
      email,
      avatarUrl,
      bloodGroup,
      district,
      upazila,
      role,
      status,
    };

    console.log(registrationData);

    fetch('https://your-backend-api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire('Success!', 'Registration successful!', 'success');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Registration failed.', 'error');
      });
  };

  return (
    <div>
      {/* Banner Section */}
      <motion.div
        className="relative bg-cover bg-center h-64"
        style={{ backgroundImage: "url('https://via.placeholder.com/1920x400?text=Register+as+a+Donor')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold">Register as a Blood Donor</h1>
        </div>
      </motion.div>

      {/* Form Section */}
      <div className="py-12 text-black">
        <motion.div
          className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}>
          <h2 className="text-2xl font-bold mb-6">Donor Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="block font-medium mb-2">Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="file-input file-input-bordered w-full"
              />
              {formData.avatarUrl && (
                <img src={formData.avatarUrl} alt="Avatar Preview" className="w-16 h-16 mt-2 rounded-full" />
              )}
            </div>

            {/* Blood Group */}
            <div>
              <label className="block font-medium mb-2">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="select select-bordered w-full"
                required>
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block font-medium mb-2">District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="select select-bordered w-full"
                required>
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="block font-medium mb-2">Upazila</label>
              <select
                name="upazila"
                value={formData.upazila}
                onChange={handleChange}
                className="select select-bordered w-full"
                required>
                <option value="">Select Upazila</option>
                {upazilas.map((upazila) => (
                  <option key={upazila} value={upazila}>
                    {upazila}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Register
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BloodDonationRegistration;
