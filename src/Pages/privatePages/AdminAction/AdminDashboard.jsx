import React from 'react';
import AdminHome from './AdminDashHome/AdminHome';
import AdminNav from './AdminDashHome/AdminNav';
import { Outlet } from 'react-router-dom';
import Footer from '../../../HomeComponent/Footer/Footer';

const AdminDashboard = () => {
    return (
        <div>
           <div className='flex'>
           <AdminNav></AdminNav>
           <Outlet></Outlet>
           </div>
           <Footer></Footer>
            
        </div>
    );
};

export default AdminDashboard;