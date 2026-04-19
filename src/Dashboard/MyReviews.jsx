import React, { useRef, useState } from "react";
import useAuth from "../useHook/useAuth";
import useAxiosSecure from "../useHook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../compunents/Loading/Loading";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MyReviews = () => {
  const { user } = useAuth();
  const editModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [currentData, setCurrentData] = useState(null);
  const [ratings, setRatings] = useState(currentData?.ratings);
  const [review, setReview] = useState(currentData?.review);
  const {
    data: myReviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-reviews`);
      return result.data;
    },
  });
  // console.log(myReviews)
  // console.log(currentData)
  if (isLoading) return <Loading></Loading>;
  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/my-reviews/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your reviews has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };

  const editOpenModal = (edit) => {
    setCurrentData(edit);
    editModalRef.current.showModal();
  };
  const editCloseModal = () => {
    editModalRef.current.close();
  };

  // edit e click hole update hobe
  const handleEdit = async (edit) => {
    // console.log(edit);
    const updateData = {
      review: review,
      ratings:ratings,
    };
    const res = await axiosSecure.patch(`my-reviews/${edit._id}`, updateData);
    // console.log(res.data);
    if (res.data) {
      toast.success("Your review edit");
       editModalRef.current.close()
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            {/* Scholarship Name, University Name, Review Comment, Review Date, Rating, Actions.
             */}
            <tr>
              <th>No</th>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Review Comment</th>
              <th>Review Date</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myReviews.map((myReview, index) => (
              <tr key={myReview._id}>
                <th>{index + 1}</th>
                <td>{myReview.scholarshipName}</td>
                <td>{myReview.universityName}</td>
                <td>{myReview.review}</td>
                <td>{myReview.reviewDate}</td>
                <td>{myReview.ratings}</td>
                <td>
                  <div className="flex gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => editOpenModal(myReview)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleDelete(myReview._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* edit */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog ref={editModalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Ratings & Reviews!</h3>
            <div className="py-4 gap-4">
              <select
                type="number"
                min="1"
                max="5"
                className="input w-full mb-5 shadow-2xl"
                defaultValue={currentData?.ratings}
                onChange={(e) => setRatings(e.target.value)}
              >
                <option value="">select ratings</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <textarea
                className="bg-white border border-gray-300 shadow-2xl w-full"
                cols="20"
                rows="10"
                placeholder="Edit your reviews"
                defaultValue={currentData?.review || ""}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-action">
              <div method="" className="flex gap-5">
                {/* if there is a button in form, it will close the modal */}
                <button
                  onClick={() => handleEdit(currentData)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={editCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyReviews;
