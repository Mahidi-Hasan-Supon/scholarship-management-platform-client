import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router";
import 'animate.css';

const Card = ({ scholarship }) => {
  const {
    scholarshipName,
    universityImage,
    scholarshipCategory,
    location,
    universityCountry,
    universityCity,
    applicationFees,
  } = scholarship;

  return (
    <div className="">
      <div className="card bg-linear-to-r from-[#8ecf35] to-[#23cc88]  w-96 mx-auto  shadow-sm animate__animated animate__backInDown animate__duration-1000">
        <figure className="">
          <img
            src={universityImage}
            className="w-[500px] object-cover h-[300px]"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl">{scholarshipName}</h2>
          <div className="flex justify-between font-bold">
            <p className="flex items-center gap-2">
              <CiLocationOn /> {universityCountry},{universityCity}
            </p>
            <p>${applicationFees}</p>
          </div>
          <p className="flex items-center gap-2 font-bold">
            <MdCategory /> {scholarshipCategory}
          </p>
          <div className="card-actions justify-center">
            <Link
              to={`/cardDetails/${scholarship._id}`}
              className="btn bg-green-600 w-full"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
