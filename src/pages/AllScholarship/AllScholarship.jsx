import React, { useEffect, useState } from "react";
import Card from "../ScholarshipCard/Card";
import Loading from "../../compunents/Loading/Loading";

const AllScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 5;
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_SERVER_SITE}/scholarship?limit=${limit}&skip=${currentPage * limit}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data.result);
        setTotalCount(data.count);
        const page = Math.ceil(totalCount / limit);
        // console.log(page);
        setTotalPage(page);
      });
  }, [totalPage, totalCount, currentPage]);
  // console.log(scholarships);

  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold md:text-center">All Scholarship</h1>
      <div className="grid md:grid-cols-3 gap-4 pt-10 ">
        {scholarships.map((scholarship) => (
          <div className="">
            <Card scholarship={scholarship} key={scholarship._id}></Card>
          </div>
        ))}
      </div>
      <div className="py-10 gap-5 items-center flex justify-center">
        {currentPage > 0 && (
          <button
            className="btn bg-green-400"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            pre
          </button>
        )}
        {[...Array(totalPage).keys()].map((i) => (
          <button
            onClick={() => setCurrentPage(i)}
            className={`btn ${i === currentPage && "bg-green-400"}`}
            key={i}
          >
            {i}
          </button>
        ))}
        {currentPage < totalPage - 1 && (
          <button
            className="btn bg-green-400"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default AllScholarship;
