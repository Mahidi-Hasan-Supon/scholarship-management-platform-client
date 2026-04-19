import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import error from "../../assets/errorImg.jpg";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      <div className="flex justify-center items-center py-10">
        <div className="relative mb-30">
          <img src={error} alt="" />
        </div>
        <div className="absolute mt-96">
            <Link to='/'>
            <button className="text-xl text-white font-bold btn opacity-80 bg-amber-400 ">
               <FaArrowLeft ></FaArrowLeft> Go to home
            </button>
            </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
