import React from "react";
import useAxiosSecure from "../../useHook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { CiLocationOn } from "react-icons/ci";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router";
import "animate.css";

const TopScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { data: topScholarships = [], isLoading } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axiosSecure(`/top-scholarships?sortBy=fees`);
      return res.data;
    },
  });
  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6 ]">
        Top <span className="">Scholarships</span>{" "}
      </h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5 ">
          {topScholarships.map((scholarship) => (
            <div className="">
              <div className="w-96 mx-auto hover:shadow-2xl rounded-2xl bg-linear-to-r from-[#8ecf35] to-[#23cc88]  animate__animated animate__backInDown animate__duration-1000 hover:animate__heartBeat">
                <figure className="object-cover">
                  <img
                    className="w-[500px] object-cover h-[300px]"
                    src={scholarship?.universityImage}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl">
                    {scholarship?.scholarshipName}
                  </h2>
                  <div className="flex justify-between font-bold">
                    <p className="flex items-center gap-2">
                      <CiLocationOn /> {scholarship?.universityCountry},
                      {scholarship?.universityCity}
                    </p>
                    <p>${scholarship?.applicationFees}</p>
                  </div>
                  <p className="flex items-center gap-2 font-bold">
                    <MdCategory /> {scholarship?.scholarshipCategory}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default TopScholarship;
