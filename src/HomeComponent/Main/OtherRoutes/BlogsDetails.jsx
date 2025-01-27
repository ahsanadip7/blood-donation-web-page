import React from 'react';
import { useLoaderData } from 'react-router-dom';

const BlogDetails = () => {
    const blog = useLoaderData();

    return (
        <div className="p-5">
            <img 
                src={blog.thumbnail} 
                alt={blog.title} 
                className="w-full h-60 object-cover rounded-md mb-5" 
            />
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-700">{blog.content}</p>
        </div>
    );
};

export default BlogDetails;
