import React, { useRef, useState } from "react";
import useAxiosSecure from "../useHook/useAxiosSecure";
import useAuth from "../useHook/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../compunents/Loading/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { imageUpload } from "../utils";
import axios from "axios";
import Swal from "sweetalert2";

const ManageScholarship = () => {
  const { register, handleSubmit, reset } = useForm();

  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  // country city data
  const [selectedCountry, setSelectedCountry] = useState("");

  // country and city
  const countryCityData = {
    USA: ["New York", "Los Angeles", "Chicago"],
    UK: ["London", "Manchester", "Birmingham"],
    Canada: ["Toronto", "Vancouver", "Montreal"],
    Australia: ["Sydney", "Melbourne", "Brisbane"],
  };

  const { user } = useAuth();
  const {
    data: manageScholarship = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manageScholarship"],
    queryFn: async () => {
      const result = await axiosSecure(`manage-scholarship`);
      return result.data;
    },
  });
  // console.log(manageScholarship);
  if (isLoading) return <Loading></Loading>;
  // modal update er kaj
  const handleOpenModal = (scholarship) => {
    // delete scholarship.universityImage
    const { universityImage, ...rest} = scholarship
    reset(rest);


    setSelectedCountry(scholarship?.universityCountry);
    modalRef.current.showModal();
  };
  const handleCancelModal = () => {
    modalRef.current.close();
  };
  // manage scholarship update
  const handleUpdate = async (data) => {
    // console.log(data);
    try {
      let photoURL = data?.universityImage;
      // console.log(data.universityImage);

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
        tuitionFees: Number(data.tuitionFees),
      };
      
      // যদি নতুন image দেয়
      if (data.universityImage && data.universityImage.length > 0) {
        photoURL = await imageUpload(data.universityImage[0]);
        updatedData.universityImage = photoURL 
      }
      const res = await axiosSecure.patch(
        `/scholarship/${data._id}`,
        updatedData,
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Scholarship Updated ✅");
        modalRef.current.close();
        refetch();
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };
  // manage scholarship delete data in db
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`scholarship/${id}`).then((res) => {
          console.log(res.data);
          if (res.data) {
            //  refetch bolale refresh korer  agei delete hoye jabe
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your scholarship has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Scholarship $ University Name</th>
              <th>City & Country</th>
              <th>ScholarshipCategory & TuitionFees</th>
              <th>Degree</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {manageScholarship.map((scholarship, key) => (
              <tr key={scholarship._id}>
                <th>{key + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={scholarship?.universityImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">
                        {scholarship.universityName}
                      </div>
                      <div className="text-sm opacity-50">
                        {scholarship.universityName}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {scholarship.universityCity} & {scholarship.universityCountry}
                  {/* <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span> */}
                </td>
                <td>
                  {scholarship.scholarshipCategory} & {scholarship.tuitionFees}
                </td>
                <td>{scholarship.degree}</td>
                <th>
                  <div className="">
                    <button
                      onClick={() => handleOpenModal(scholarship)}
                      type="button"
                      className="btn btn-primary btn-xs mr-2"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(scholarship._id)}
                      className="btn btn-secondary btn-xs my-2"
                    >
                      Delete
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {/* modal */}
        <dialog ref={modalRef} className="modal">
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
              <input
                type="file"
                name="universityImage"
                {...register("universityImage", {
                  // required: true,
                })}
                placeholder="photo"
                className="w-full file-input"
              />

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
                {...register("tuitionFees", { required: true })}
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
                onClick={handleCancelModal}
                type="button"
                className="btn btn-primary w-full"
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

export default ManageScholarship;
