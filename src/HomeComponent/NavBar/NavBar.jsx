import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
      <NavLink to="/registration"><li>Registration</li></NavLink>
      <NavLink to="/donation-requests"><li>Donation Requests</li></NavLink>
      <NavLink to="/blog"><li>Blog</li></NavLink>
      <NavLink to="/funding"><li>Funding</li></NavLink>
      <NavLink to="/search"><li>Search</li></NavLink>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-lime-600 via-emerald-500 to-cyan-600 text-white p-5 shadow-lg py-10">
      {/* Logo and Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden text-white"
            aria-label="Toggle Navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu text-black font-semibold px-4 menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {user ? userLinks : guestLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl font-bold">
          Blood Donation Application
        </a>
      </div>

      {/* Navigation Links for Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5 font-semibold text-lg">
          {user ? userLinks : guestLinks}
        </ul>
      </div>

      {/* User Section */}
      <div className="navbar-end mr-5">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt={`${user.displayName || "User"}'s Profile`}
              />
              <div
                className="absolute z-10 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block right-0"
                onMouseEnter={(e) => e.currentTarget.classList.add("block")}
                onMouseLeave={(e) => e.currentTarget.classList.remove("block")}
              >
                <div
                  className="py-1 text-gray-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {isAdmin && (
                    <NavLink
                      to="/AdminDashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  {isVolunteer && (
                    <NavLink
                      to="/VolunteerDashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                    >
                      Volunteer Dashboard
                    </NavLink>
                  )}
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    role="menuitem"
                    aria-label="Sign Out"
                  >
                    <FaSignOutAlt className="inline mr-2" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <NavLink to="/login" className="font-bold hover:underline">
              Login
            </NavLink>
            /
            <NavLink to="/signUp" className="font-bold hover:underline">
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
