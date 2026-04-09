import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import Loading from "../compunents/Loading/Loading";
import useAuth from "../useHook/useAuth";
import useAxiosSecure from "../useHook/useAxiosSecure";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MyApplications = () => {
  const { register, handleSubmit, reset } = useForm();
  const detailsModalRef = useRef();
  const editModalRef = useRef();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [defaultApplication, setDefaultApplication] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  // console.log(defaultApplication);
  const countryCityData = {
    USA: ["New York", "Los Angeles", "Chicago"],
    UK: ["London", "Manchester", "Birmingham"],
    Canada: ["Toronto", "Vancouver", "Montreal"],
    Australia: ["Sydney", "Melbourne", "Brisbane"],
  };
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-applications/${user?.email}`);
      return result.data;
    },
  });
  // console.log(applications);
  if (isLoading) return <Loading></Loading>;
  // details modal
  const handleDetailsModal = (applications) => {
    setDefaultApplication(applications);
    detailsModalRef.current.showModal();
  };
  // edit modal
  const handleEditCloseModal = () => {
    editModalRef.current.close();
  };
  const handleEditModal = (applications) => {
    const { ...rest } = applications;
    reset(rest);
    setSelectedCountry(applications.universityCountry);
    editModalRef.current.showModal();
  };
  const handleUpdate = async (data) => {
    // console.log(data);
    try {
      const updatedData = {
        scholarshipName: data.scholarshipName,
        universityName: data.universityName,
        // universityImage: photoURL,
        universityCountry: data.universityCountry,
        universityCity: data.universityCity,
        universityWorldRank: data.universityWorldRank,
        subjectCategory: data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree: data.degree,
        applicationFees: Number(data.applicationFees),
      };
      const res = await axiosSecure.patch(
        `/my-applications/${data._id}`,
        updatedData,
      );
      // console.log(res);
      if (res.data.modifiedCount > 0) {
        toast.success("Scholarship Updated ✅");
        editModalRef.current.close();
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>University Name</th>
              <th>University Address</th>
              <th>Feedback</th>
              <th>Subject Category</th>
              <th>Application Fees</th>
              <th>Application Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {applications.map((application, index) => (
              <tr key={application._id}>
                <th>{index + 1}</th>
                <td>{application.universityName}</td>
                <td>
                  {application.universityCity} & {application.universityCountry}
                </td>
                <td>{application.feedback || "Pending"}</td>
                <td>{application.subjectCategory}</td>
                <td>{application.amount}</td>
                <td>{application.applicationStatus}</td>
                <td>
                  <div>
                    {application.applicationStatus === "rejected" && (
                      <button className="btn m-2">Rejected</button>
                    )}
                    <button
                      onClick={() => handleDetailsModal(application)}
                      className="btn m-2"
                    >
                      Details
                    </button>
                    {application.applicationStatus === "pending" && (
                      <button
                        onClick={() => handleEditModal(application)}
                        className="btn m-2"
                      >
                        Edit
                      </button>
                    )}
                    {application.applicationStatus === "pending" &&
                      application.payment_status === "unpaid" && (
                        <Link to={`/cardDetails/${application.scholarshipId}`}>
                          <button className="btn m-2">Pay</button>
                        </Link>
                      )}
                    {application.applicationStatus === "pending" && (
                      <button className="m-2 btn">Delete</button>
                    )}
                    {application.applicationStatus === "completed" && (
                      <button className="btn m-2">Add Reviews</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* details */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog ref={detailsModalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold mb-2 text-lg text-center">
              Applications Details!
            </h3>
            <h3 className="font-semibold m-2 text-amber-300">
              ScholarshipName:{" "}
              <span className="text-secondary font-sans">
                {defaultApplication?.scholarshipName}
              </span>
            </h3>
            <h3 className="font-semibold m-2 text-amber-300">
              ScholarshipCategory:{" "}
              <span className="text-secondary font-sans">
                {defaultApplication?.scholarshipCategory}
              </span>
            </h3>
            <h3 className="font-semibold m-2 text-amber-300">
              UniversityName:{" "}
              <span className="text-secondary font-sans">
                {defaultApplication?.universityName}
              </span>
            </h3>
            <h3 className="font-semibold m-2 text-amber-300">
              SubjectCategory:{" "}
              <span className="text-secondary font-sans">
                {defaultApplication?.subjectCategory}
              </span>
            </h3>
            <p className="font-semibold m-2 text-amber-300">
              Degree:{" "}
              <span className="text-secondary font-sans">
                {defaultApplication?.degree}
              </span>
            </p>
            <p className="font-semibold m-2 text-amber-300">
              City & Country:{" "}
              <span className="text-secondary font-sans">
                {defaultApplication?.universityCity} &{" "}
                {defaultApplication?.universityCountry}
              </span>
            </p>
            <p className="font-semibold m-2 text-amber-300">
              SubjectCategory:{" "}
              <span className="text-secondary font-sans">
                {defaultApplication?.subjectCategory}
              </span>
            </p>
            <p className="font-semibold m-2 text-amber-300">
              ApplicationStatus & PaymentStatus:{" "}
              <span className="text-secondary font-sans">
                {defaultApplication?.applicationStatus} &{" "}
                {defaultApplication?.payment_status}
              </span>
            </p>
            <p className="font-semibold m-2 text-amber-300">
              Amount & ServiceCharge:{" "}
              <span className="text-secondary font-sans">
                $ {defaultApplication?.amount} & ${" "}
                {defaultApplication?.serviceCharge}
              </span>
            </p>
            <p className="font-semibold m-2 text-amber-300">
              AppliedDate:{" "}
              <span className="text-secondary font-sans">
                {defaultApplication?.appliedAt}
              </span>
            </p>
            <p className="font-semibold m-2 text-amber-300">
              Email:{" "}
              <span className="text-secondary font-sans">
                {defaultApplication?.studentEmail}
              </span>
            </p>
            <p className="font-semibold flex m-2 text-amber-300">
              Feedback:{" "}
              <span
                className={`font-sans ml-2 ${applications?.feedback === "pending" ? "text-secondary" : "text-primary"}`}
              >
                {defaultApplication?.feedback || "pending"}
              </span>
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn text-white bg-pink-500">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* edit */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog ref={editModalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Scholarship!</h3>
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
              {/* Scholarship Name */}
              <input
                name="scholarshipName"
                {...register("scholarshipName", {
                  required: true,
                })}
                placeholder="Scholarship Name"
                className="input input-bordered w-full"
              />
              {/* universityName */}

              <input
                list="universities"
                {...register("universityName", {
                  required: true,
                })}
                placeholder="University Name"
                className="input input-bordered w-full"
              />

              <datalist id="universities">
                <option value="Harvard University" />
                <option value="Oxford University" />
                <option value="University of Toronto" />
              </datalist>
              {/* image */}

              {/* <input
                type="file"
                {...register("universityImage")}
                className="file-input w-full"
              /> */}
              {/* <input
                type="file"
                name="universityImage"
                {...register("universityImage", {
                  // required: true,
                })}
                placeholder="photo"
                className="w-full file-input"
              /> */}

              {/* Country */}

              <select
                {...register("universityCountry", {
                  required: true,
                })}
                className="select select-bordered w-full"
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {/* <option value="">
                                Select university country
                              </option> */}
                {Object.keys(countryCityData).map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
              {/* city */}
              <select
                {...register("universityCity", {
                  required: true,
                })}
                className="select w-full select-md"
              >
                {/* <option value="">Select university city</option> */}
                {selectedCountry &&
                  countryCityData[selectedCountry].map((city) => (
                    <option key={city}>{city}</option>
                  ))}
              </select>
              {/* world rank */}

              <select
                {...register("universityWorldRank", {
                  required: true,
                })}
                // defaultValue="Select World Rank"
                className="select w-full select-md"
              >
                {/* <option value="">Select World Rank</option> */}
                <option value="Top 50">Top 50</option>
                <option value="Top 100">Top 100</option>
                <option value="Top 200">Top 200</option>
                <option value="Top 500">Top 500</option>
                <option value="1000+">1000+</option>
              </select>
              {/* subject category */}
              {/* <input
                defaultValue={updateScholarship?.subjectCategory}
                name="Subject Category"
                {...register("subjectCategory", {
                  required: true,
                })}
                placeholder="Subject (e.g. CSE, BBA)"
                className="input input-bordered w-full"
              /> */}

              <select
                {...register("scholarshipCategory", {
                  required: true,
                })}
                className="select select-bordered w-full"
              >
                {/* <option value="">Scholarship Type</option> */}
                <option value="Full Funded">Full Funded</option>
                <option value="Partial">Partial</option>
                <option value="Self Funded">Self Funded</option>
              </select>

              <select
                {...register("degree", { required: true })}
                className="select select-bordered w-full"
              >
                {/* <option value="">Select Degree</option> */}
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
                <option value="Diploma">Diploma</option>
              </select>

              <select
                {...register("applicationFees", { required: true })}
                className="select w-full select-md"
              >
                {/* <option value="">Select Tuition Fees</option> */}
                {/* <option value="0">Free (Fully Funded)</option> */}
                <option value="1000">Under $1000</option>
                <option value="5000">Under $5000</option>
                <option value="10000">Under $10000</option>
                <option value="20000">Above $20000</option>
              </select>
              <button type="submit" className="btn btn-primary w-full">
                Update
              </button>
              <button
                onClick={handleEditCloseModal}
                type="button"
                className="btn btn-secondary w-full"
              >
                Cancel
              </button>
            </form>
            {/* <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal
                              <button className="btn">Update</button>
                              <button className="btn">Close</button>
                            </form>
                          </div> */}
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyApplications;
