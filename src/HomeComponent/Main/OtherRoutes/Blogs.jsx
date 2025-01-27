import React, { useState } from 'react';
import { useLoaderData, NavLink } from 'react-router-dom';

const Blogs = () => {
    const blogs = useLoaderData();
    const [searchQuery, setSearchQuery] = useState("");

    // Filtered blogs based on the search query
    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">All Blogs</h1>

            {/* Search Input */}
            <div className="mb-5">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/2 border rounded-md p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            {/* Blog List */}
            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredBlogs.map((blog) => (
                        <div key={blog._id} className="border rounded-lg shadow-md p-4 bg-white">
                            <img
                                src={blog.thumbnail}
                                alt={blog.title}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-600 mb-3">
                                {blog.content.substring(0, 100)}...
                            </p>
                            <NavLink
                                to={`/blogDetails/${blog._id}`}
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Read More
                            </NavLink>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No blogs found for "{searchQuery}".</p>
            )}
        </div>
    );
};

export default Blogs;
