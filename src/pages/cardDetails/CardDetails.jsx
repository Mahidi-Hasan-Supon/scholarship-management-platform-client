import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState({});
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/scholarship/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setScholarship(data);
      });
  }, [id]);
  return (
    <div className="py-10">
      <div className="card card-side bg-base-100 w-2xl mx-auto shadow-sm">
        <figure>
          <img src={scholarship.universityImage} alt="Movie" />
          
        </figure>
        
        <div className="card-body">
            <h1 className="text-3xl font-bold">{scholarship.scholarshipName}</h1>
          <p className="text-gray-600">
            {" "}
            University Rank: {scholarship.universityWorldRank}{" "}
          </p>{" "}
          <p>Deadline: {scholarship.applicationDeadline}</p>{" "}
          <p>Location: {scholarship.location}</p>{" "}
          <p>Application Fee: ${scholarship.applicationFees}</p>{" "}
          <h2 className="mt-4 font-semibold">Description</h2>{" "}
          <p>{scholarship.description}</p>{" "}
          <h2 className="mt-4 font-semibold">Coverage / Stipend</h2>{" "}
          <p>{scholarship.stipend}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
