
import React from 'react';
import DashNav from './DashNav';
import { Outlet } from 'react-router-dom';
import Footer from '../../../HomeComponent/Footer/Footer';


const DashBoard = () => {
    return (
        <div>
          
               <div className='flex w-full'>
               <DashNav></DashNav>
               <Outlet></Outlet>
               </div>
                <Footer></Footer>
            
        </div>
    );
};

export default DashBoard;