import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const BloodDonationRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    thumbnailUrl: '',
    bloodGroup: '',
    district: '',
    upazila: '',
    dateOfBirth: null,
    preferredDate: '',
    preferredTime: '',
    password: '',
    confirmPassword: '',
    role: 'donor',
    status: 'inprogress',
  });

  const districts = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna'];
  const upazilas = ['Upazila 1', 'Upazila 2', 'Upazila 3'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const {
      name,
      email,
      thumbnailUrl,
      bloodGroup,
      district,
      upazila,
      preferredDate,
      preferredTime,
      password,
      confirmPassword,
    } = formData;

    if (!name.trim()) return Swal.fire('Error', 'Name is required.', 'error');
    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return Swal.fire('Error', 'Valid email is required.', 'error');
    if (!thumbnailUrl.trim() || !/^https?:\/\//.test(thumbnailUrl))
      return Swal.fire('Error', 'Provide a valid image URL.', 'error');
    if (!bloodGroup) return Swal.fire('Error', 'Select a blood group.', 'error');
    if (!district) return Swal.fire('Error', 'Select a district.', 'error');
    if (!upazila) return Swal.fire('Error', 'Select an upazila.', 'error');
    if (!preferredDate) return Swal.fire('Error', 'Select a preferred donation date.', 'error');
    if (!preferredTime) return Swal.fire('Error', 'Select a preferred donation time.', 'error');
    if (!password || password.length < 6)
      return Swal.fire('Error', 'Password must be at least 6 characters long.', 'error');
    if (password !== confirmPassword)
      return Swal.fire('Error', 'Passwords do not match.', 'error');

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const {
      name,
      email,
      thumbnailUrl,
      bloodGroup,
      district,
      upazila,
      preferredDate,
      preferredTime,
      role,
      status,
    } = formData;

    const registrationData = {
      name,
      email,
      thumbnailUrl,
      bloodGroup,
      district,
      upazila,
      preferredDate,
      preferredTime,
      role,
      status,
    };

    console.log(registrationData);

    fetch('https://assignment-12-server-omega-six.vercel.app/bloodDonor', {
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
    <div className="bg-white dark:bg-gray-900">
      {/* Banner Section */}
      <motion.div
        className="relative bg-cover bg-center h-64"
        style={{
          backgroundImage:
            "url('https://via.placeholder.com/1920x400?text=Register+as+a+Donor')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold">Register as a Blood Donor</h1>
        </div>
      </motion.div>

      {/* Form Section */}
      <div className="py-12 px-4 text-black dark:text-white">
        <motion.div
          className="max-w-3xl mx-auto p-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Donor Registration Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Text Inputs */}
            {[
              { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
              {
                label: 'Image/Thumbnail URL',
                name: 'thumbnailUrl',
                type: 'url',
                placeholder: 'Enter image URL',
              },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block mb-1 font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition"
                  required
                />
              </div>
            ))}

            {/* Preferred Donation Date with Icon */}
            <div className="relative">
              <label className="block mb-1 font-medium">Preferred Donation Date</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition"
                required
              />
              <FaCalendarAlt className="absolute right-[43px] top-[70%] translate-y-[-50%] text-gray-500 dark:text-gray-300 pointer-events-none" />
            </div>

            {/* Preferred Donation Time with Icon */}
            <div className="relative">
              <label className="block mb-1 font-medium">Preferred Donation Time</label>
              <input
                type="time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition"
                required
              />
              <FaClock className="absolute right-[44px] top-[70%] translate-y-[-50%] text-gray-500 dark:text-gray-300 pointer-events-none" />
            </div>

            {/* Password Fields */}
            {[
              { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter password' },
              {
                label: 'Confirm Password',
                name: 'confirmPassword',
                type: 'password',
                placeholder: 'Confirm password',
              },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block mb-1 font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition"
                  required
                />
              </div>
            ))}

            {/* Dropdowns */}
            {[
              { label: 'Blood Group', name: 'bloodGroup', options: bloodGroups },
              { label: 'District', name: 'district', options: districts },
              { label: 'Upazila', name: 'upazila', options: upazilas },
            ].map(({ label, name, options }) => (
              <div key={name}>
                <label className="block mb-1 font-medium">{label}</label>
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition"
                  required
                >
                  <option value="">Select {label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all dark:bg-blue-500 dark:hover:bg-blue-600"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Register
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BloodDonationRegistration;
