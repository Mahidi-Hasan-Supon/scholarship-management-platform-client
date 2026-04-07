import React from "react";
import useAxiosSecure from "../useHook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../compunents/Loading/Loading";
import { StarHalf } from "lucide-react";
import Swal from "sweetalert2";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [], isLoading , refetch} = useQuery({
    queryKey: [],
    queryFn: async () => {
      const result = await axiosSecure(`/reviews`);
      return result.data;
    },
  });
  // console.log(reviews);
  const handleDelete = async (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data) {
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: "Your Reviews data has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };
  if (isLoading) return <Loading></Loading>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name & Email</th>
              <th>UniversityName</th>
              <th>ReviewDate & Review</th>
              <th>Ratings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={review?.userImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{review.userName}</div>
                      <div className="text-sm opacity-50">
                        {review.userEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{review.universityName}</td>
                <td>
                  {review.reviewDate} & {review.review}
                </td>

                <td>
                  <span className="flex text-secondary">
                    <StarHalf></StarHalf> {review.ratings}
                  </span>
                </td>

                <th>
                  <div className="">
                    <button
                      className="btn btn-secondary btn-xs my-2"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviews;
