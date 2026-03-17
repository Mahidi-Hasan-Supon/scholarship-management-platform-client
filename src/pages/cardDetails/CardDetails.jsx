import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../../compunents/Loading/Loading";
import useAuth from "../../useHook/useAuth";

const CardDetails = () => {
  const {user} = useAuth()
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
    applicationDeadline,
    location,
    coverage,
    applicationFees,
    description,
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
      applicationDeadline,
      location,
      coverage,
      applicationFees,
      description,
      universityName,
      studentInfo:{
        name:user?.displayName,
        email:user?.email, 
        photoURL:user?.photoURL
      }
    };
    const result = await axios.post(
        `${import.meta.env.VITE_SERVER_SITE}/create-checkout-session`,paymentInfo
      )
      console.log(result);
  };

  return (
    <div className="py-10">
      <div className="card card-side bg-base-100 md:w-2xl mx-auto shadow-sm">
        <figure>
          <img
            src={universityImage}
            className="w-[1200px] object-cover"
            alt="Movie"
          />
        </figure>

        <div className="card-body ">
          <h1 className="text-3xl font-bold">{scholarshipName}</h1>
          <p className="text-gray-600">
            {" "}
            University Rank:{" "}
            <span className=" font-semibold">{universityWorldRank}</span>{" "}
          </p>{" "}
          <p>
            Deadline:{" "}
            <span className=" font-semibold">{applicationDeadline}</span>
          </p>{" "}
          <p>
            Location: <span className=" font-semibold">{location}</span>{" "}
          </p>{" "}
          <p>
            Application Fee:{" "}
            <span className=" font-semibold">${applicationFees}</span>{" "}
          </p>{" "}
          <h2 className="mt-4 ">Description</h2>{" "}
          <p>
            <span className=" font-semibold">{description}</span>{" "}
          </p>{" "}
          <h2 className="mt-4 ">Coverage / Stipend</h2>{" "}
          <p className=" font-semibold">{coverage}</p>
          <div className="card-actions justify-center">
            <button onClick={handlePayment} className="btn btn-primary w-full">
              Apply for Scholarship
            </button>
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
