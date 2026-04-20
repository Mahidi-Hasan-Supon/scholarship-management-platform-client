import React from "react";
import Navbar from "../compunents/Navbar/Navbar";
import Footer from "../compunents/footer/Footer";
import { Outlet } from "react-router";
import useAuth from "../useHook/useAuth";
import Loading from "../compunents/Loading/Loading";

// bg-linear-to-r from-[#8ecf35] to-[#23cc88]
// bg-linear-to-r from-[#ff4f58] to-[#ffb400]
// min-h-[calc(100vh-250px)]
const Root = () => {
  const { loading } = useAuth();

  return (
    <div className="md:w-7xl mx-auto ">
      <Navbar></Navbar>
      <div className="bg-[#23BE0A50]  min-h-[calc(100vh-250px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Root;
