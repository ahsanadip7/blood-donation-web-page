import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AllUsers = () => {
    const allUsers = useLoaderData();
    const [users, setUsers] = useState(allUsers.filter((user) => user.adminRol !== 'admin'));
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Filter users based on status
    const filteredUsers =
        filter === 'all'
            ? users
            : users.filter((user) => user.activeStatus === (filter === 'active'));

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    // Update user status
    const handleStatusChange = (userId, newStatus) => {
        fetch(`https://assignment-12-server-omega-six.vercel.app/user/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ activeStatus: newStatus }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user._id === userId ? { ...user, activeStatus: newStatus } : user
                        )
                    );
                    Swal.fire(
                        'Success!',
                        `User status updated to ${newStatus ? 'Active' : 'Blocked'}`,
                        'success'
                    );
                }
            });
    };

    // Toggle Volunteer status
    const handleVolunteerToggle = (userId, isVolunteer) => {
        fetch(`https://assignment-12-server-omega-six.vercel.app/user/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: isVolunteer ? 'user' : 'volunteer' }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user._id === userId
                                ? { ...user, role: isVolunteer ? 'user' : 'volunteer' }
                                : user
                        )
                    );
                    Swal.fire(
                        'Success!',
                        `User role updated to ${isVolunteer ? 'User' : 'Volunteer'}`,
                        'success'
                    );
                }
            });
    };

    // Update user role to admin
    const handleMakeAdmin = (userId) => {
        fetch(`https://assignment-12-server-omega-six.vercel.app/user/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adminRol: 'admin' }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user._id === userId ? { ...user, adminRol: 'admin' } : user
                        )
                    );
                    Swal.fire('Success!', 'User role updated to Admin', 'success');
                }
            });
    };

    return (
        <div className="p-6 bg-gray-100 w-full">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>

            {/* Filter Options */}
            <div className="flex justify-between items-center mb-4">
                <select
                    onChange={(e) => setFilter(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <img
                                        src={user.photo}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                </td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.activeStatus ? 'Active' : 'Blocked'}</td>
                                <td>
                                    <div className="dropdown dropdown-end">
                                        <button
                                            tabIndex={0}
                                            className="btn btn-sm btn-ghost"
                                        >
                                            <i className="fas fa-ellipsis-v"></i>
                                        </button>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                                        >
                                            {user.activeStatus ? (
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(user._id, false)
                                                        }
                                                        className="text-warning"
                                                    >
                                                        Block
                                                    </button>
                                                </li>
                                            ) : (
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(user._id, true)
                                                        }
                                                        className="text-success"
                                                    >
                                                        Unblock
                                                    </button>
                                                </li>
                                            )}
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        handleVolunteerToggle(
                                                            user._id,
                                                            user.role === 'volunteer'
                                                        )
                                                    }
                                                    className={
                                                        user.role === 'volunteer'
                                                            ? 'text-danger'
                                                            : 'text-primary'
                                                    }
                                                >
                                                    {user.role === 'volunteer'
                                                        ? 'Remove Volunteer'
                                                        : 'Make Volunteer'}
                                                </button>
                                            </li>
                                            {user.adminRol !== 'admin' && (
                                                <li>
                                                    <button
                                                        onClick={() => handleMakeAdmin(user._id)}
                                                        className="text-info"
                                                    >
                                                        Make Admin
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`btn btn-sm mx-1 ${
                            currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
