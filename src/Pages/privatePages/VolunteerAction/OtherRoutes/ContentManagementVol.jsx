import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ContentManagementVol = ({ userRole }) => { // Assuming userRole is passed as a prop
    const allBlogs = useLoaderData(); // Data provided by the loader
    const [blogs, setBlogs] = useState(allBlogs || []); // Initialize state with loader data
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;

    // Optional: Log for debugging
    console.log(blogs);

    // Derived state: Filtered blogs
    const filteredBlogs = blogs.filter((blog) =>
        filter === 'all' ? true : blog.status === filter
    );

    // Derived state: Paginated blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Total Pages for pagination
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Handle publish and unpublish
  const updateBlogStatus = async (id, status) => {
    try {
      const res = await fetch(`https://assignment-12-server-omega-six.vercel.app/blogs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (res.ok && data.status) {
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
        const res = await fetch(`https://assignment-12-server-omega-six.vercel.app/blogs/${id}`, { method: 'DELETE' });

        if (!res.ok) throw new Error('Failed to delete blog!');

        const data = await res.json();

        if (data.deletedCount > 0) {
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

  return (
    <div className="p-6 bg-gray-100 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <Link to="addBlog">
          <button className="btn btn-primary">Add Blog</button>
        </Link>
      </div>

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
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div key={blog._id}>
                <img src={blog.thumbnail} alt="" />
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <div className="flex justify-between items-center mt-4">
                {/* Only show publish/unpublish and delete buttons for admins */}
                {userRole === 'admin' && blog.status === 'draft' && (
                  <button
                    onClick={() => updateBlogStatus(blog._id, 'published')}
                    className="btn btn-success btn-sm"
                  >
                    Publish
                  </button>
                )}
                {userRole === 'admin' && blog.status === 'published' && (
                  <button
                    onClick={() => updateBlogStatus(blog._id, 'draft')}
                    className="btn btn-warning btn-sm"
                  >
                    Unpublish
                  </button>
                )}
                {userRole === 'admin' && (
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs available. Click "Add Blog" to create your first blog.</p>
      )}

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
  );
};

export default ContentManagementVol;
