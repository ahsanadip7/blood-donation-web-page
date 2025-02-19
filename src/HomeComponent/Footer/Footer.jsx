import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-lime-600 via-emerald-500 to-cyan-600 text-white py-10"
        >
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4">About Us</h2>
                    <p className="text-sm mb-4">
                        We connect donors with recipients to save lives. Join us in making a difference through blood donation. Every drop counts!
                    </p>
                    <Link to="/about" className="text-white hover:text-gray-300 underline text-sm">
                        Learn More
                    </Link>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:underline">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/donate" className="hover:underline">
                                Donate Blood
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Contact</h2>
                    <p className="text-sm">
                        123 Blood Drive Avenue, Saving Lives City, 45678
                    </p>
                    <p className="mt-2">
                        Phone:{" "}
                        <a href="tel:+1234567890" className="hover:underline">
                            +123 456 7890
                        </a>
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:help@blooddonation.com" className="hover:underline">
                            help@blooddonation.com
                        </a>
                    </p>
                    {/* Social Media */}
                    <div className="flex space-x-4 mt-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <FaFacebookF size={20} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <FaInstagram size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                <p className="text-sm">
                    Made with <FaHeart className="inline text-red-500 mx-1" /> by Blood Donation Application
                </p>
                <p className="text-xs mt-2">© 2025 Blood Donation. All rights reserved.</p>
            </div>
        </motion.footer>
    );
};

export default Footer;
