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
    fetch(`http://localhost:5000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
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
            <button className="btn btn-primary w-full">
              Apply for Scholarship
            </button>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <h2 className="mt-10 text-2xl font-bold">Reviews</h2>
      <div className="space-y-4 mt-4">
        {reviews.map((review) => (
          <div key={review._id} className="border p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <img src={review.userImage} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{review.userName}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            <p className="mt-2">⭐ {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDetails;
