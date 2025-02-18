import React from 'react';
import DashNav from './DashNav';
import { Outlet } from 'react-router-dom';
import Footer from '../../../HomeComponent/Footer/Footer';
import NavBar from '../../../HomeComponent/NavBar/NavBar';

const DashBoard = () => {
  return (
    <div>
        <NavBar></NavBar>
        <div className="flex flex-col lg:flex-row w-full ">
      {/* Sidebar - DashNav */}
      <div className="lg:w-60 w-full bg-white dark:bg-gray-800 pt-5">
        <DashNav />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>

    {/* Footer */}
    <div className="w-full mt-0">
      <Footer />
    </div>

    </div>
  );
};

export default DashBoard;
