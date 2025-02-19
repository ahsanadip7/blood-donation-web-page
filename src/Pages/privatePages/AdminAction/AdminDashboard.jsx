import React from 'react';
import AdminHome from './AdminDashHome/AdminHome';
import AdminNav from './AdminDashHome/AdminNav';
import { Outlet } from 'react-router-dom';
import Footer from '../../../HomeComponent/Footer/Footer';
import NavBar from '../../../HomeComponent/NavBar/NavBar';

const AdminDashboard = () => {
    return (
        <div>
        {/* Navbar */}
        <NavBar />

        {/* Main Dashboard Layout */}
        <div className="flex flex-col lg:flex-row w-full">
            {/* Sidebar - AdminNav */}
            <div className="lg:w-60 w-full bg-white dark:bg-gray-800 pt-5">
                <AdminNav />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-4">
                <Outlet />
            </div>
        </div>

        {/* Footer */}
        <div className="w-full mt-4">
            <Footer />
        </div>
    </div>
    );
};

export default AdminDashboard;