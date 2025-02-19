import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';

const AddBlogVol = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleCreateBlog = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !thumbnail || !content) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    // Blog data to send to the server
    const blogData = {
      title,
      thumbnail,
      content,
      status: 'draft', // Ensure the blog is created as a draft
    };

    try {
      const res = await fetch('https://assignment-12-server-omega-six.vercel.app/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire('Success', 'Blog created successfully!', 'success');
        navigate('/AdminDashboard/contentManagement');
      } else {
        Swal.fire('Error', 'Failed to create blog!', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'An error occurred while creating the blog!', 'error');
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Add Blog</h1>
      <form onSubmit={handleCreateBlog} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">Title</label>
          <input
            type="text"
            className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">Thumbnail Image URL</label>
          <input
            type="text"
            className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Enter thumbnail URL"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Use <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ImageBB</a> to upload your image and get the URL.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full dark:bg-blue-700 dark:text-white">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlogVol;
