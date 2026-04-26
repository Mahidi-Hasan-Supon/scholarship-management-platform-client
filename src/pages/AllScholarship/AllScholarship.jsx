import React, { useEffect, useState } from "react";
import Card from "../ScholarshipCard/Card";
import Loading from "../../compunents/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../useHook/useAxiosSecure";

const AllScholarship = () => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  // const [scholarships, setScholarships] = useState([]);
  // const [totalCount, setTotalCount] = useState(0);
  // const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const axiosSecure = useAxiosSecure();
  const limit = 5;
  // useEffect(() => {
  //   fetch(
  //     `${import.meta.env.VITE_SERVER_SITE}/scholarship?limit=${limit}&skip=${currentPage * limit}`,
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setScholarships(data.result);
  //       setTotalCount(data.count);
  //       const page = Math.ceil(totalCount / limit);
  //       // console.log(page);
  //       setTotalPage(page);
  //     });
  // }, [totalPage, totalCount, currentPage]);
  // console.log(scholarships);

  // search &  filter api
  const {
    data: result = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["scholarships", search, country, category, currentPage , sortField ,sortOrder],
    queryFn: async () => {
      const res = await axiosSecure(
        `/scholarships?search=${search}&country=${country}&category=${category}&limit=${limit}&skip=${currentPage * limit}&sortField=${sortField}&sortOrder=${sortOrder}`,
      );
      return res.data;
    },
  });
  const scholarships = result?.result || [];
  const totalCount = result?.count || 0;
  const totalPage = Math.ceil(totalCount / limit);
  // console.log(scholarships);
  // if(isLoading) return <Loading></Loading>
  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold md:text-center">All Scholarship</h1>
      {/* filter & search field*/}
      <div className="py-10 gap-4 flex justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(0);
          }}
          className="input mx-5"
        />
        <div>
          <select
            className="input w-full"
            onChange={(e) => {
              const value = e.target.value;

              if (value === "fees-asc") {
                setSortField("applicationFees");
                setSortOrder("asc");
              } else if (value === "fees-desc") {
                setSortField("applicationFees");
                setSortOrder("desc");
              } else if (value === "date-desc") {
                setSortField("postDate");
                setSortOrder("desc");
              } else if (value === "date-asc") {
                setSortField("postDate");
                setSortOrder("asc");
              }

              setCurrentPage(0);
            }}
          >
            <option value="">Sort By</option>
            <option value="fees-asc">Fees Low → High</option>
            <option value="fees-desc">Fees High → Low</option>
            <option value="date-desc">Newest Data →</option>
            <option value="date-asc">Oldest Data →</option>
          </select>
        </div>
        <div className="gap-2 mr-2">
          <select
            onChange={(e) => {
              setCountry(e.target.value);
              setCurrentPage(0);
            }}
            className="input"
            value={country}
          >
            <option value="">All Country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">CANADA</option>
            <option value="australia">AUSTRALIA</option>
          </select>

          <select
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(0);
            }}
            className="input mt-2"
            value={country}
          >
            <option value="">All Category</option>
            <option value="Full Funded">Full Funded</option>
            <option value="Partial">Partial</option>
            <option value="Self Funded">Self Funded</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 pt-10 ">
        {isLoading ? (
          <Loading></Loading>
        ) : scholarships.length > 0 ? (
          scholarships.map((scholarship) => (
            <div className="">
              <Card scholarship={scholarship} key={scholarship._id}></Card>
            </div>
          ))
        ) : (
          <div className="text-center col-span-3">No Scholarship Add</div>
        )}
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
