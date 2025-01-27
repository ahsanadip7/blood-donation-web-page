import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="space-y-10">
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

            {/* Featured Section */}
            <motion.div
                className="p-5"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-3xl font-bold text-center mb-6">Why Join Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            className="text-center p-6 border rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                            <p>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Contact Us Section */}
            <motion.div
                className="p-5 bg-gray-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
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
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <textarea
                            rows="5"
                            placeholder="Your Message"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        ></textarea>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-lg"
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
                        <p className="text-lg font-semibold">
                            Call Us: <a href="tel:+123456789" className="text-blue-600">+1 (234) 567-89</a>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
