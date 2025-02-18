import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../../../HomeComponent/Footer/Footer';
import NavBar from '../../../HomeComponent/NavBar/NavBar';

const VolunteerDash = () => {
  return (
    <div>
       <NavBar></NavBar>
      <div className='flex p-2'>
       
        <Nav></Nav>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default VolunteerDash;