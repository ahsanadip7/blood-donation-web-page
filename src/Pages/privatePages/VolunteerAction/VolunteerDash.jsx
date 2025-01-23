import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../../../HomeComponent/Footer/Footer';

const VolunteerDash = () => {
    return (
        <div>
          <div className='flex p-2'>
          <Nav></Nav>
          <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
    );
};

export default VolunteerDash;