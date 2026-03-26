import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../../compunents/Loading/Loading";
import useAuth from "../../useHook/useAuth";
import { number } from "framer-motion";

const CardDetails = () => {
  const { user } = useAuth();
  // const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  // const [scholarship, setScholarship] = useState({});
  const {
    data: scholarship = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_SERVER_SITE}/scholarship/${id}`,
      );
      return result.data;
    },
  });
  // console.log(scholarship);
  const {
    _id,
    universityImage,
    scholarshipName,
    universityWorldRank,
    universityCountry,
    universityCity,
    tuitionFees,
    degree,
    subjectCategory,
    scholarshipCategory,
    universityName,
  } = scholarship || {};
  if (isLoading) return <Loading></Loading>;
  // useEffect(() => {
  //   fetch(`http://localhost:5000/scholarship/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setScholarship(data);
  //     });
  //   reviews section
  //   fetch(`http://localhost:5000/reviews/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setReviews(data);
  //     });
  // }, [id]);

  const handlePayment = async () => {
    const paymentInfo = {
      scholarshipId: _id,
      universityImage,
      scholarshipName,
      universityWorldRank,
      location,
      tuitionFees,
      universityName,
      universityCountry,
      studentInfo: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_SITE}/create-checkout-session`,
      paymentInfo,
    );
    window.location.href = data.url;
    // console.log(data.url);
  };

  return (
    <div className="py-10">
      <div className="card card-side bg-base-100 md:w-3xl mx-auto shadow-sm">
        <figure>
          <img
            src={universityImage}
            className="w-[800px] object-cover"
            alt="Movie"
          />
        </figure>

        <div className="card-body p-2 m-2">
          <h1 className="text-3xl font-bold">{scholarshipName}</h1>
          <p className="text-gray-600">
            {" "}
            University Rank:{" "}
            <span className=" font-semibold">{universityWorldRank}</span>{" "}
          </p>{" "}
          <p>
            University Name:{" "}
            <span className=" font-semibold">{universityName}</span>
          </p>{" "}
          <p>
            Subject category:{" "}
            <span className=" font-semibold">{subjectCategory} </span>{" "}
          </p>{" "}
          <p>
            Scholarship category:{" "}
            <span className=" font-semibold">{scholarshipCategory} </span>{" "}
          </p>{" "}
          <p>
            Tuition Fee:{" "}
            <span className=" font-semibold">${tuitionFees}</span>{" "}
          </p>{" "}
          <h2 className="mt-4 ">Degree:</h2>{" "}
          <p>
            <span className=" font-semibold">{degree}</span>{" "}
          </p>{" "}
          <h2 className="mt-4 ">Country & City:</h2>{" "}
          <p className=" font-semibold">
            {universityCountry} & {universityCity}
          </p>
          <div className="card-actions justify-center">
            {scholarship.paymentStatus === "paid" ? (
              <span className="text-green-400">Paid</span>
            ) : (
              <button
                onClick={handlePayment}
                className="btn btn-primary w-full"
              >
                Apply for Scholarship
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <h2 className="py-20 text-2xl font-bold">Reviews</h2>
      {/* <div className="space-y-4 mt-4">
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
      </div> */}
    </div>
  );
};

export default CardDetails;
