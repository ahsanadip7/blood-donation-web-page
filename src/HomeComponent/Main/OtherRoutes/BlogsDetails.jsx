import React from 'react';
import { useLoaderData } from 'react-router-dom';

const BlogDetails = () => {
  const blog = useLoaderData();
  console.log(blog.content);

  return (
    <div className=" bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5">
      <div className="max-w-4xl mx-auto">
        <img 
          src={blog.thumbnail} 
          alt={blog.title} 
          className="w-full h-60 object-cover rounded-md shadow-lg mb-6"
        />
        <h1 className="text-4xl font-bold mb-4 text-center">{blog.title}</h1>
        <p className="text-lg leading-relaxed text-gray-700 text-center dark:text-gray-300">
          {blog.content}
        </p>
      </div>
    </div>
  );
};

export default BlogDetails;
