import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../../compunents/Loading/Loading";
import useAuth from "../../useHook/useAuth";
import { number } from "framer-motion";
import useAxiosSecure from "../../useHook/useAxiosSecure";
import { toast } from "react-toastify";

const CardDetails = () => {
  const { user } = useAuth();
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  // const [scholarship, setScholarship] = useState({});
  const axiosSecure = useAxiosSecure();
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
  // reviews get api
  const { data: reviews = [], refetch: reviewRefetch } = useQuery({
    queryKey: ["reviews", scholarship._id],
    queryFn: async () => {
      const result = await axiosSecure(`/reviews/${_id}`);
      return result.data;
    },
  });
  console.log(reviews);

  const {
    _id,
    universityImage,
    scholarshipName,
    universityWorldRank,
    universityCountry,
    universityCity,
    applicationFees,
    degree,
    subjectCategory,
    scholarshipCategory,
    universityName,
    deadline,
    postDate,
    serviceCharge,
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
      applicationFees,
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
    console.log(data.url);
    window.location.href = data.url;
    // console.log(data.url);
  };
  const handleReviews = async () => {
    const alreadyReviewed = reviews.find((r) => r.userEmail === user?.email);
    if (alreadyReviewed) {
      return toast.error("Already submitted");
    }
    const reviewData = {
      scholarshipId: _id,
      universityName,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      review,
      ratings,
      reviewDate: new Date(),
    };
    await axiosSecure.post(`/reviews`, reviewData);
    console.log(reviewData);
    toast.success("Reviews added");
    reviewRefetch();
  };

  return (
    <div className="py-10">
      <div className="py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Image */}
          <img
            src={universityImage}
            className="w-full h-[350px] object-cover"
            alt="University"
          />

          {/* Content */}
          <div className="p-6 space-y-3">
            <h1 className="text-3xl font-bold text-primary">
              {scholarshipName}
            </h1>

            <p className="text-gray-500">{universityName}</p>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <p>
                🎓 <span className="font-semibold">Degree:</span> {degree}
              </p>

              <p>
                🌍 <span className="font-semibold">Location:</span>{" "}
                {universityCountry}, {universityCity}
              </p>

              <p>
                🏫 <span className="font-semibold">World Rank:</span>{" "}
                {universityWorldRank}
              </p>

              <p>
                📚 <span className="font-semibold">Subject:</span>{" "}
                {subjectCategory}
              </p>

              <p>
                💰 <span className="font-semibold">Application Fees:</span> $
                {applicationFees}
              </p>

              <p>
                ⚡ <span className="font-semibold">Service Charge:</span> $
                {serviceCharge}
              </p>

              <p>
                🗓 <span className="font-semibold">Post Date:</span> {postDate}
              </p>

              <p>
                ⏳ <span className="font-semibold">Deadline:</span> {deadline}
              </p>
            </div>

            {/* Total Cost */}
            <div className="mt-4 p-4 bg-gray-100 rounded-xl">
              <p className="text-lg font-semibold">
                Total Cost: $
                {Number(applicationFees || 0) + Number(serviceCharge || 0)}
              </p>
            </div>

            {/* Apply Button */}
            <div className="mt-6">
              <button
                onClick={handlePayment}
                className="btn btn-primary w-full text-lg"
              >
                Apply for Scholarship 🚀
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 my-10">
          {/* Add Review Section */}
          <div className="flex-2 bg-white shadow-lg rounded-2xl p-6 border">
            <h3 className="text-2xl font-bold mb-4 text-primary">Add Review</h3>

            <div className="flex flex-col gap-4">
              <input
                type="number"
                min="1"
                max="5"
                value={ratings}
                placeholder="Rating (1-5)"
                className="input input-bordered w-full"
                onChange={(e) => setRatings(e.target.value)}
              />

              <textarea
                placeholder="Write your review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="textarea textarea-bordered w-full"
                rows={4}
              ></textarea>

              <button
                className="btn bg-primary text-white hover:bg-primary/90"
                onClick={handleReviews}
              >
                {/* {alreadyReviewed ? 'alreadyReviewed' : "Submit Review"} */}
                Submit Review
              </button>
            </div>
          </div>

          {/* All Reviews Section */}
          <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 border">
            <h2 className="text-2xl font-bold mb-4">All Reviews</h2>

            <div className="flex flex-col gap-5 max-h-[400px] overflow-y-auto pr-2">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start border-b pb-4"
                >
                  <img
                    src={review.userImage}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold">{review.userName}</h4>
                    <h4 className="font-semibold">{review.userEmail}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(review.reviewDate).toLocaleDateString()}
                      {/* {review.reviewDate} */}
                    </p>

                    <p className="text-yellow-500 font-medium">
                      ⭐ {review.ratings}
                    </p>

                    <p className="text-gray-700 mt-1">{review.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
