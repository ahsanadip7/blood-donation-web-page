import React from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const allDonation = useLoaderData()
    console.log(allDonation);
    return (
        <div className="space-y-10 bg-white dark:bg-gray-900">

            {/* Banner Section */}
            <motion.div
                className="bg-gradient-to-r from-lime-600 via-emerald-500 to-cyan-600 text-white py-20 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Save Lives, Join the Mission</h1>
                <p className="text-lg md:text-xl mb-10">
                    Become a donor or search for donors in your area.
                </p>
                <motion.div
                    className="space-x-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <NavLink
                        to="/registration"
                        className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 shadow-lg"
                    >
                        Join as a Donor
                    </NavLink>
                    <NavLink
                        to="/search"
                        className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 shadow-lg"
                    >
                        Search Donors
                    </NavLink>
                </motion.div>
            </motion.div>

            <motion.section
      className="px-4 py-8 md:px-8 lg:px-16 bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Recent Donation Requests
      </h2>

      <div className="overflow-x-auto">
        <div className="flex space-x-6 pb-4">
          {allDonation.map((donation) => (
            <motion.div
              key={donation._id}
              className="min-w-[300px] max-w-sm p-5 border rounded-2xl shadow-md bg-white dark:bg-gray-800 text-left space-y-2 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">
                {donation.recipientName}
              </h3>

              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <p><span className="font-medium">Blood Group:</span> {donation.bloodGroup}</p>
                <p><span className="font-medium">Date:</span> {donation.donationDate}</p>
                <p><span className="font-medium">Time:</span> {donation.donationTime}</p>
                <p><span className="font-medium">Hospital:</span> {donation.hospitalName}</p>
                <p><span className="font-medium">District:</span> {donation.recipientDistrict}</p>
                <p><span className="font-medium">Upazila:</span> {donation.recipientUpazila}</p>
              </div>

              {donation.requestMessage && (
                <p className="text-sm italic text-gray-600 dark:text-gray-400 mt-2">
                  “{donation.requestMessage}”
                </p>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Requested by: <span className="font-medium">{donation.requesterName}</span>
              </p>

              <p className={`mt-1 text-sm font-semibold ${
                donation.status === 'Pending'
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-green-600 dark:text-green-400'
              }`}>
                Status: {donation.status}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>

            {/* Featured Section */}
            <motion.div
    className="p-5"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
>
    <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Why Join Us?</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
            {
                title: "Connect with a Cause",
                text: "Be a part of a community dedicated to saving lives through blood donation and support.",
            },
            {
                title: "Find Donors Easily",
                text: "Our platform helps you search and connect with donors near you in just a few clicks.",
            },
            {
                title: "Make an Impact",
                text: "Each blood donation can save up to three lives. Your contribution truly makes a difference.",
            },
        ].map((item, index) => (
            <motion.div
                key={index}
                className="text-center p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-shadow duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
            </motion.div>
        ))}
    </div>
</motion.div>


           {/* Testimonials Section */}
<motion.div
    className="p-5"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
>
    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">What Our Donors Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
            {
                name: "John Doe",
                testimonial: "Donating blood is such a rewarding experience. It feels good to help others.",
            },
            {
                name: "Jane Smith",
                testimonial: "I joined to give back to the community. It's easy and feels great to make a difference.",
            },
            {
                name: "Alice Johnson",
                testimonial: "A simple donation can save a life. I'm proud to be part of this mission.",
            },
        ].map((item, index) => (
            <motion.div
                key={index}
                className="text-center p-6 border rounded-lg shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <p className="italic text-gray-600 dark:text-gray-300">"{item.testimonial}"</p>
                <p className="mt-4 font-semibold text-gray-800 dark:text-white">{item.name}</p>
            </motion.div>
        ))}
    </div>
</motion.div>






            <motion.div
                className="p-20 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white text-center rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Your Donation Can Make a Lifesaving Difference
                </h2>
                <p className="text-lg md:text-xl mb-8">
                    Blood donation is a simple act that saves lives. By joining our platform, you can connect with others and contribute to a global cause. Every donation counts in our mission to create a healthier world.
                </p>

                <div className="flex justify-center space-x-8 mb-8">
                    <motion.div
                        className="text-center"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                    >
                        <div className="text-6xl font-semibold mb-2">
                            <span>5000+</span>
                        </div>
                        <p className="text-lg">Donors Registered</p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.7 }}
                    >
                        <div className="text-6xl font-semibold mb-2">
                            <span>15000+</span>
                        </div>
                        <p className="text-lg">Lives Saved</p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.7 }}
                    >
                        <div className="text-6xl font-semibold mb-2">
                            <span>20+</span>
                        </div>
                        <p className="text-lg">Countries Impacted</p>
                    </motion.div>
                </div>

                <NavLink
                    to="/join"
                    className="px-12 py-4 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                    Join the Movement
                </NavLink>
            </motion.div>


            {/* Contact Us Section */}
            <motion.div
                className="p-5 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Contact Us</h2>
                <div className="max-w-2xl mx-auto">
                    {/* Contact Form */}
                    <motion.form
                        className="space-y-4"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                        />
                        <textarea
                            rows="5"
                            placeholder="Your Message"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-lg dark:bg-green-800 dark:hover:bg-green-700"
                        >
                            Send Message
                        </button>
                    </motion.form>

                    {/* Contact Info */}
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">
                            Call Us:{" "}
                            <a href="tel:+123456789" className="text-blue-600 dark:text-blue-400">
                                +1 (234) 567-89
                            </a>
                        </p>
                    </motion.div>
                </div>
            </motion.div>




        </div>
    );
};

export default Home;
