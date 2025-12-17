import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router";

const Card = ({scholarship}) => {
  const {scholarshipName , universityImage , scholarshipCategory , location , applicationFees} = scholarship
  
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="">
          <img
            src={universityImage} className="w-[500px] object-cover h-[300px]"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl">{scholarshipName}</h2>
           <div className="flex justify-between font-bold">
              <p className="flex items-center gap-2">
               <CiLocationOn /> {location}
              </p>
              <p>
                  ${applicationFees }
              </p>

           </div>
           <p className="flex items-center gap-2 font-bold">
         <MdCategory />  { scholarshipCategory}
           </p>
          <div className="card-actions justify-center">
            <Link to={`/cardDetails/${scholarship._id}`} className="btn btn-primary w-full">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
