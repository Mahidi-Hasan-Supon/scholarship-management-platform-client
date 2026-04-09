import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../useHook/useAxiosSecure";
import useAuth from "../useHook/useAuth";
import Loading from "../compunents/Loading/Loading";
import { toast } from "react-toastify";

const ManageAppliedApplications = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const feedbackModalRef = useRef();
  const detailsModalRef = useRef();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   useEffect(() => {
  //   if (selectedApplication) {
  //     detailsModalRef.current.showModal();
  //   }
  // }, [selectedApplication]);
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/applications`);
      return result.data;
    },
  });
  // console.log(applications);
  if (isLoading) return <Loading></Loading>;
  // details api

  // feedback modal
  const handleFeedback = (application) => {
    setSelectedApplication(application);
    feedbackModalRef.current.showModal();
  };
  const handleSubmitFeedback = async () => {
    await axiosSecure.patch(
      `/applications/feedback/${selectedApplication._id}`,
      {
        feedback: feedbackText,
      },
    );
    toast.success("Feedback Done");
    feedbackModalRef.current.close();
    setFeedbackText("");
    refetch();
    // console.log('submit' );
  };
  const handleFeedbackCloseModal = () => {
    feedbackModalRef.current.close();
  };
  // details modal
  const handleDetailsModal = (application) => {
    // console.log(application);
    setSelectedApplication(application);
    detailsModalRef.current.showModal();
  };
  const handleDetailsCloseModal = () => {
    detailsModalRef.current.close();
  };
  // status update
  const handleStatusUpdate = async (id, applicationStatus) => {
    // console.log(id);
    // console.log(status);
    await axiosSecure.patch(`/applications/status/${id}`, {
      applicationStatus,
    });
    refetch();
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Application Name</th>
              <th>Application Email</th>
              <th>University Name</th>
              <th>Details</th> 
              <th>Application Feedback</th>
              <th>Application Status</th>
              <th>Payment Status</th>
              {/* University Name, Application Feedback, Application Status, Payment Status, Actions.
               */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {applications.map((application, index) => (
              <tr key={application._id}>
                <th>{index + 1}</th>
                <td>{application.studentName}</td>
                <td>{application.studentEmail}</td>
                <td>{application.universityName}</td>
                {/* details */}

                <td>
                  <div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      className="btn btn-dash btn-warning"
                      onClick={() => handleDetailsModal(application)}
                    >
                      Details
                    </button>
                  </div>
                </td>
                {/* feedback */}
                <td>
                  <div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      onClick={() => handleFeedback(application)}
                      className="btn btn-dash btn-secondary"
                    >
                      Feedback
                    </button>
                  </div>
                </td>
                {/*application status */}
                <td>
                  <select
                    value={application.applicationStatus}
                    onChange={(e) =>
                      handleStatusUpdate(application._id, e.target.value)
                    }
                    className="select"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <div className="card-actions justify-center">
                    {application.payment_status === "paid" ? (
                      <span className=" btn btn-primary">Paid</span>
                    ) : (
                      <button className="btn btn-sm btn-secondary ">
                        Unpaid
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* details */}
        <dialog ref={detailsModalRef} className="modal">
          <div className="modal-box space-y-3 text-fuchsia-500 bg-amber-300">
            <h3 className="font-bold text-lg">Application Details</h3>

            <p>
              Name:{" "}
              <span className="font-serif">
                {selectedApplication?.studentName}
              </span>
            </p>
            <p>
              Email:{" "}
              <span className="font-serif">
                {selectedApplication?.studentEmail}
              </span>
            </p>
            <p>
              UniversityName:{" "}
              <span className="font-serif">
                {" "}
                {selectedApplication?.universityName}
              </span>
            </p>
            <p>
              ScholarshipCategory:{" "}
              <span className="font-serif">
                {" "}
                {selectedApplication?.scholarshipCategory}
              </span>
            </p>
            <p>
              Degree:{" "}
              <span className="font-serif"> {selectedApplication?.degree}</span>
            </p>
            <p>
              ServiceCharge: $
              <span className="font-serif">
                {" "}
                {selectedApplication?.serviceCharge}
              </span>
            </p>
            <p>
              ApplicationStatus:{" "}
              <span className="font-serif">
                {" "}
                {selectedApplication?.applicationStatus}
              </span>
            </p>
            <p>
              Status:{" "}
              <span className="font-serif">
                {" "}
                {selectedApplication?.payment_status}
              </span>
            </p>
            <p>
              Amount:{" "}
              <span className="font-serif">
                {" "}
                {/* {application?.amount} */}
                {selectedApplication?.amount}
              </span>
            </p>
            <p>
              Feedback:{" "}
              <span className="font-serif">
                {" "}
                {/* {application?.amount} */}
                {selectedApplication?.feedback}
              </span>
            </p>
            <div className="modal-action">
              <button
                onClick={handleDetailsCloseModal}
                className="btn btn-dash btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
        {/* feedback */}
        <dialog ref={feedbackModalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give Feedback!</h3>
            <p className="py-4">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Secondary"
                className="textarea textarea-secondary"
              ></textarea>
            </p>
            <div className="flex justify-between">
              <button
                className="btn btn-dash btn-primary"
                onClick={handleSubmitFeedback}
              >
                Submit
              </button>
              <button
                onClick={handleFeedbackCloseModal}
                className="btn btn-dash btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ManageAppliedApplications;
