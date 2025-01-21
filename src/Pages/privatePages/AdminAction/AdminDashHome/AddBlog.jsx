import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';

const AddBlog = () => {
    const editor = useRef(null);
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:5000/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

   // Filter blogs based on draft or published status
   const filteredBlogs = blogs.filter((blog) =>
    filter === 'all' ? true : blog.status === filter
  );

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Handle publish and unpublish
  const updateBlogStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
  
      const data = await res.json();
  
      if (res.ok && data.status) {
        // Update the status in the state immediately
        setBlogs(blogs.map((blog) => (blog._id === id ? { ...blog, status: data.status } : blog)));
  
        Swal.fire(
          'Success',
          `Blog ${status === 'published' ? 'published' : 'unpublished'} successfully!`,
          'success'
        );
      } else {
        Swal.fire('Error', 'Failed to update blog status!', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update blog status!', 'error');
    }
  };
  

  // Handle blog deletion
  const deleteBlog = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this blog!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/blogs/${id}`, { method: 'DELETE' });
  
        // Check if the response was successful
        if (!res.ok) {
          throw new Error('Failed to delete blog!');
        }
  
        const data = await res.json();
  
        // Ensure deletedCount is returned from the server
        if (data.deletedCount > 0) {
          // Remove the deleted blog from the blogs state
          setBlogs(blogs.filter((blog) => blog._id !== id));
          Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
        } else {
          Swal.fire('Error', 'Blog not found or already deleted!', 'error');
        }
      } catch (error) {
        Swal.fire('Error', error.message, 'error');
      }
    }
  };
  

  // Handle pagination
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

        // Replace the fetch URL with your backend endpoint
        fetch('http://localhost:5000/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blogData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire('Success', 'Blog created successfully!', 'success');
                    navigate('/AdminDashboard/contentManagement');
                }
            })
            .catch((err) => Swal.fire('Error', 'Failed to create blog!', 'error'));
    };

    return (
        <div className="p-6 bg-gray-100 w-full">
            <h1 className="text-2xl font-bold mb-4">Add Blog</h1>
            <form onSubmit={handleCreateBlog} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Thumbnail Image URL</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
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
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Create Blog
                </button>
            </form>


            <div className="p-6 bg-gray-100 w-full">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Filter Blogs</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Display Blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentBlogs.map((blog) => (
          <div key={blog._id} className="card bg-white shadow-md p-4">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <img src={blog.thumbnail} alt={blog.title} className="w-full h-32 object-cover my-2" />
            <p>{blog.content.slice(0, 100)}...</p>
            <div className="flex justify-between items-center mt-4">
              {/* Publish or Unpublish Button */}
              {blog.status === 'draft' ? (
                <button
                  onClick={() => updateBlogStatus(blog._id, 'published')}
                  className="btn btn-success btn-sm"
                >
                  Publish
                </button>
              ) : (
                <button
                  onClick={() => updateBlogStatus(blog._id, 'draft')}
                  className="btn btn-warning btn-sm"
                >
                  Unpublish
                </button>
              )}

              {/* Delete Button (Admin Only) */}
              <button
                onClick={() => deleteBlog(blog._id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm btn-secondary"
          >
            Previous
          </button>
          <div className="mx-2 text-lg">{currentPage}</div>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-secondary"
          >
            Next
          </button>
        </div>
      )}
    </div>
        </div>

        
    );
};

export default AddBlog;
