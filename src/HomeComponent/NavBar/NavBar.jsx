import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaMoon, FaSignOutAlt, FaSun } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useDarkMode } from "../../AuthProvider/DarkModeContext";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useDarkMode();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const [loading, setLoading] = useState(true);
  const [userWithRole, setUserWithRole] = useState(null);

  useEffect(() => {
    fetch("https://assignment-12-server-omega-six.vercel.app/user")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setUserWithRole(data);
        } else {
          console.error("No user data found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  const currentUser = userWithRole?.find((u) => u.email === user?.email);
  const isAdmin = currentUser?.adminRol === "admin";
  const isVolunteer = currentUser?.role === "volunteer";

  // Links visible before logging in
  const guestLinks = (
    <>
      <NavLink to="/"><li>Home</li></NavLink>
      <NavLink to="/donation-requests"><li>Donation Requests</li></NavLink>
      <NavLink to="/blog"><li>Blog</li></NavLink>
      <NavLink to="/login"><li>Login</li></NavLink>
    </>
  );

  // Links visible after logging in
  const userLinks = (
    <>
      <NavLink to="/"><li>Home</li></NavLink>
      <NavLink to="/all-donations"><li>All Donations</li></NavLink>
      <NavLink to="/registration"><li>Registration</li></NavLink>
      <NavLink to="/donation-requests"><li>Donation Requests</li></NavLink>
      <NavLink to="/blog"><li>Blog</li></NavLink>
      <NavLink to="/funding"><li>Funding</li></NavLink>
      <NavLink to="/search"><li>Search</li></NavLink>
    </>
  );

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-lime-600 via-emerald-500 to-cyan-600 shadow-lg z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-5 text-white">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="dropdown lg:hidden">
              <button tabIndex={0} className="btn btn-ghost text-white" aria-label="Toggle Navigation">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button>
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52 
               bg-white text-black dark:bg-gray-800 dark:text-white font-semibold ">
                <li>{user ? userLinks : guestLinks}</li>
              </ul>

            </div>
            <a className="text-2xl font-bold">Blood Donation Application</a>
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-900" />}
            </button>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-5 font-semibold text-lg">
              {user ? userLinks : guestLinks}
            </ul>
          </div>

          {/* User Section */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={`${user.displayName || "User"}'s Profile`}
                  />
                  <div className="absolute z-10 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block right-0">
                    <div className="py-1 text-gray-700" role="menu">
                      {isAdmin && <NavLink to="/AdminDashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Admin Dashboard</NavLink>}
                      {isVolunteer && <NavLink to="/VolunteerDashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Volunteer Dashboard</NavLink>}
                      <NavLink to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</NavLink>
                      <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <FaSignOutAlt className="inline mr-2" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <NavLink to="/login" className="font-bold hover:underline">Login</NavLink>
                /
                <NavLink to="/signUp" className="font-bold hover:underline">Sign Up</NavLink>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Padding to prevent content from being hidden under the fixed navbar */}
      <div className="pt-[80px]">
        {/* Page content goes here */}
      </div>
    </>
  );

};

export default NavBar;
