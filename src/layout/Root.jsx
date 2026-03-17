import React from 'react';
import Navbar from '../compunents/Navbar/Navbar';
import Footer from '../compunents/footer/Footer';
import { Outlet } from 'react-router';
import useAuth from '../useHook/useAuth';
import Loading from '../compunents/Loading/Loading';

const Root = () => {
    const {loading} = useAuth()
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