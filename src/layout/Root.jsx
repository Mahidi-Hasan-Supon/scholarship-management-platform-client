import React from "react";
import Navbar from "../compunents/Navbar/Navbar";
import Footer from "../compunents/footer/Footer";
import { Outlet } from "react-router";
import useAuth from "../useHook/useAuth";
import Loading from "../compunents/Loading/Loading";

// bg-linear-to-r from-[#8ecf35] to-[#23cc88]
// // gradient(-145deg, #ff4f58, #ffb400);
const Root = () => {
  // const {loading} = useAuth()
  //   linear-gradient(11deg, #8ecf35, #23cc88)
  return (
    <div className="md:w-7xl mx-auto">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-250px)] bg-base-100">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
