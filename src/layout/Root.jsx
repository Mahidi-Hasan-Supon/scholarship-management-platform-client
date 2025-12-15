import React from 'react';
import Navbar from '../compunents/Navbar/Navbar';
import Footer from '../compunents/footer/Footer';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className='md:w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-285px)]'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;