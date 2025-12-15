import React from "react";
import { useLoaderData } from "react-router";
import Card from "../ScholarshipCard/Card";

const AllScholarship = () => {
  const scholarships = useLoaderData();
  console.log(scholarships);
  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold md:text-center">All Scholarship</h1>
      <div className="grid md:grid-cols-3 gap-4 pt-10">
        {scholarships.map((scholarship) => (
          <Card scholarship={scholarship} key={scholarship._id}></Card>
        ))}
      </div>
    </div>
  );
};

export default AllScholarship;
