import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../useHook/useAuth";
import { imageUpload } from "../utils";

const AddScholarship = () => {
  const { user, updateProfileFunc } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState("");
  const { register, handleSubmit, reset } = useForm();

  // country and city
  const countryCityData = {
    USA: ["New York", "Los Angeles", "Chicago"],
    UK: ["London", "Manchester", "Birmingham"],
    Canada: ["Toronto", "Vancouver", "Montreal"],
    Australia: ["Sydney", "Melbourne", "Brisbane"],
  };

  const {
    isPending,
    isError,
    data,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (addScholarship) =>
      // 1st time axios use
      await axios.post("http://localhost:5000/scholarship", addScholarship),
    onSuccess: (data) => {
      console.log(data);
      // toast
      // toast.success("Scholarship data added");
      mutationReset();
      // query invalieds
    },
    onError: (err) => {
      console.log(err);
    },
    onMutate: (addScholarship) => {
      console.log("i will pay this data", addScholarship);
    },
    // onsettled hocce data and error er combination
    onSettled: (data, err) => {
      if (data) {
        console.log(data);
      }
      if (err) {
        console.log(err);
      }
    },
    retry: 3,
  });
  if (isPending) {
    return <p>Loading......</p>;
  }
  if (isError) {
    return <p>Error....</p>;
  }

  const handleUpload = async (data) => {
    console.log(data);
    const {

      degree,
      universityImage,
      scholarshipName,
      // photo,
      scholarshipCategory,
      subjectCategory,
      tuitionFees,
      universityName,
      universityWorldRank,
      universityCountry,
      universityCity,

    } = data;
    if (!universityImage || universityImage.length === 0) {
      toast.error("Please upload image");
      return;
    }

    const imageFile = universityImage[0];
    // const formdata = new FormData();
    // formdata.append("image", imageFile);
    // const {imageData} = await axios.post(
    //   `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
    //   formdata,
    // );
    // console.log(imageData.data.data.display_url);
    const photoURL = await imageUpload(imageFile);
    await updateProfileFunc(scholarshipName, photoURL);
    const scholarshipData = {
      universityCountry,
      universityCity,
      // country,
      degree,
      universityImage: photoURL,
      scholarshipName,
      // photo,
      scholarshipCategory,
      subjectCategory,
      tuitionFees:Number(tuitionFees),
      universityName,
      universityWorldRank,
      // price: Number(price),
    };
    console.table(scholarshipData);
    try {
      await mutateAsync(scholarshipData);
      toast.success("Scholarship Added ✅");
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add Scholarship</h2>
      <form onSubmit={handleSubmit(handleUpload)} className="space-y-4">
        {/* Scholarship Name */}
        <input
          name="scholarshipName"
          {...register("scholarshipName", { required: true })}
          placeholder="Scholarship Name"
          className="input input-bordered w-full"
        />
        {/* universityName */}
        {/* <input
          name="universityName"
          {...register("universityName", { required: true })}
          placeholder="University Name"
          className="input input-bordered w-full"
        /> */}
        <input
          list="universities"
          {...register("universityName", { required: true })}
          placeholder="University Name"
          className="input input-bordered w-full"
        />

        <datalist id="universities">
          <option value="Harvard University" />
          <option value="Oxford University" />
          <option value="University of Toronto" />
        </datalist>
        {/* image */}
        <input
          type="file"
          name="universityImage"
          {...register("universityImage", { required: true })}
          placeholder="photo"
          className=" w-full file-input"
        />
        {/*  Country, City, World Rank, Subject Category, Scholarship Category, Degree, Tuition Fees  */}
        {/* Country */}
        {/* <input
          name="Country"
          {...register("country", { required: true })}
          placeholder="Country"
          className="input input-bordered w-full"
        /> */}
        <select
          {...register("universityCountry", { required: true })}
          className="select select-bordered w-full"
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select university country</option>
          {Object.keys(countryCityData).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {/* city */}
        <select
          defaultValue="Select city"
          {...register("universityCity", { required: true })}
          className="select w-full select-md"
        >
          <option value="">Select university city</option>
          {selectedCountry &&
            countryCityData[selectedCountry].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
        {/* world rank */}
        {/* <input
          name="World Rank"
          {...register("wordRank", { required: true })}
          placeholder="World Rank"
          className="input input-bordered w-full"
        /> */}
        <select
          {...register("universityWorldRank", { required: true })}
          defaultValue="Select World Rank"
          className="select w-full select-md"
        >
          <option value="">Select World Rank</option>
          <option value="Top 50">Top 50</option>
          <option value="Top 100">Top 100</option>
          <option value="Top 200">Top 200</option>
          <option value="Top 500">Top 500</option>
          <option value="1000+">1000+</option>
        </select>
        {/* subject category */}
        <input
          name="Subject Category"
          {...register("subjectCategory", { required: true })}
          placeholder="Subject (e.g. CSE, BBA)"
          className="input input-bordered w-full"
        />
        {/* scholarship category */}
        {/* <input
          name="Scholarship Category"
          {...register("scholarshipCategory", { required: true })}
          placeholder="Scholarship Category"
          className="input input-bordered w-full"
        /> */}
        <select
          {...register("scholarshipCategory", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Scholarship Type</option>
          <option value="Full Funded">Full Funded</option>
          <option value="Partial">Partial</option>
          <option value="Self Funded">Self Funded</option>
        </select>

        {/* degree */}
        {/* <input
          name="Degree"
          {...register("degree", { required: true })}
          placeholder="Degree"
          className="input input-bordered w-full"
        /> */}
        <select
          {...register("degree", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Degree</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </select>

        {/* tuition fees */}
        {/* <input
          name="Tuition Fees"
          {...register("tuitionFees", { required: true })}
          placeholder="Tuition Fees"
          className="input input-bordered w-full"
        /> */}
        <select
          defaultValue=""
          {...register("tuitionFees", { required: true })}
          className="select w-full select-md"
        >
          <option value="">Select Tuition Fees</option>
          <option value="0">Free (Fully Funded)</option>
          <option value="1000">Under $1000</option>
          <option value="5000">Under $5000</option>
          <option value="10000">Under $10000</option>
          <option value="20000">Above $20000</option>
        </select>
        <button type="submit" className="btn btn-primary w-full">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
