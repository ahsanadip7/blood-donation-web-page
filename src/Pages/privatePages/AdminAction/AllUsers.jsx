import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const allUsers = useLoaderData();
    const [users, setUsers] = useState(allUsers.filter((user)=>user.adminRol !== 'admin'));
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10; // Adjust the number of users per page

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
        fetch(`http://localhost:5000/user/${userId}`, {
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

    // Update user role
    const handleMakeVolunteer = (userId) => {
        fetch(`http://localhost:5000/user/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: 'volunteer' }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user._id === userId ? { ...user, role: 'volunteer' } : user
                        )
                    );
                    Swal.fire('Success!', 'User role updated to Volunteer', 'success');
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
                                    {user.activeStatus ? (
                                        <button
                                            className="btn btn-warning btn-sm mr-2"
                                            onClick={() =>
                                                handleStatusChange(user._id, false)
                                            }
                                        >
                                            Block
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-success btn-sm mr-2"
                                            onClick={() =>
                                                handleStatusChange(user._id, true)
                                            }
                                        >
                                            Unblock
                                        </button>
                                    )}
                                    {user.role !== 'volunteer' && (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleMakeVolunteer(user._id)}
                                        >
                                            Make Volunteer
                                        </button>
                                    )}
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
