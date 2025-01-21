import React from 'react';
import { Link } from 'react-router-dom';

const ContentManagement = () => {
  

    return (
        <div className="p-6 bg-gray-100 w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Content Management</h1>
                <Link to='addBlog'>
                <button
                    className="btn btn-primary"
                >
                    Add Blog
                </button>
                </Link>
            </div>

            {/* Add any additional content management functionality here */}
            <p>No blogs available. Click "Add Blog" to create your first blog.</p>
        </div>
    );
};

export default ContentManagement;
