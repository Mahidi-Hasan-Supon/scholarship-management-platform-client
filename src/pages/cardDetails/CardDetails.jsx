import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useNavigate, useParams } from "react-router";
import Loading from "../../compunents/Loading/Loading";
import useAuth from "../../useHook/useAuth";
import "animate.css";
import useAxiosSecure from "../../useHook/useAxiosSecure";

const CardDetails = () => {
  const { user } = useAuth();
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
      const result = await axiosSecure(
        `/scholarship/${id}`,
      );
      return result.data;
    },
  });
  // console.log(scholarship);
  // reviews get api
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", scholarship?._id],
    enabled: !!scholarship?._id,
    queryFn: async () => {
      const result = await axiosSecure(`/reviews/${scholarship?._id}`);

      return result.data;
    },
  });
  // console.log(reviews);

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
    // console.log(data.url);
    window.location.href = data.url;
    // console.log(data.url);
  };

  return (
    <div className="py-10">
      <div className="py-10 px-4 animate__animated animate__bounce">
        <div className="max-w-5xl mx-auto bg-linear-to-r from-[#8ecf35] to-[#23cc88] shadow-xl rounded-2xl overflow-hidden animate__animated animate__backInRight">
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
            <div className="mt-4 p-4 bg-green-600 rounded-xl">
              <p className="text-lg font-semibold">
                Total Cost: $
                {Number(applicationFees || 0) + Number(serviceCharge || 0)}
              </p>
            </div>

            {/* Apply Button */}
            <div className="mt-6">
              <button
                onClick={handlePayment}
                className="btn bg-green-600 w-full text-lg"
              >
                Apply for Scholarship 🚀
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {/* Add Review Section */}

        {/* All Reviews Section */}
        {reviews.length === 0 ? (
          <p className="text-blue-500 font-serif font-semibold text-2xl text-center pt-15 ">
            No reviews yet
          </p>
        ) : (
          <div className="max-w-6xl mx-auto pt-20 animate__animated animate__backInRight">
            <div className="bg-linear-to-r from-[#8ecf35] to-[#23cc88] shadow-lg rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-center ">
                All Reviews
              </h2>

              <div className=" gap-5 max-h-[400px] flex justify-center items-center overflow-y-auto pr-2">
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
        )}
      </div>
    </div>
  );
};

export default CardDetails;
