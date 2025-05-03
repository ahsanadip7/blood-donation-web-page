import React, { useState, useEffect } from 'react';
import { useLoaderData, NavLink } from 'react-router-dom';

const Blogs = () => {
  const blogs = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Filtered blogs based on the search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulating loading delay (You can adjust this based on real API fetching)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Simulated loading for 500ms
    return () => clearTimeout(timer);
  }, [blogs]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="p-5">
        <h1 className="text-3xl font-bold mb-5 text-center">All Blogs</h1>

        {/* Search Input */}
        <div className="mb-5 flex justify-center">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 border rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 transition-colors duration-300"
          />
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600 dark:text-gray-400">Loading...</span>
          </div>
        ) : (
          // Blog List
          <>
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="border rounded-lg shadow-lg p-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:shadow-2xl transition-shadow duration-300"
                  >
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {blog.content.substring(0, 100)}...
                    </p>
                    <NavLink
                      to={`/blogDetails/${blog._id}`}
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors duration-200"
                    >
                      Read More
                    </NavLink>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">No blogs found for "{searchQuery}".</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
