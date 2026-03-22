import React from 'react';

const AddScholarship = () => {
    return (
         <div className="max-w-xl mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add Scholarship</h2>
      <form  className="space-y-4">
        <input
          name="name"
          placeholder="Scholarship Name"
          className="input input-bordered w-full"
        />
        <input
          name="university"
          placeholder="University Name"
          className="input input-bordered w-full"
        />
        <input
          name="university"
          placeholder="University Name"
          className="input input-bordered w-full"
        />
        <input
        type='file'
          name="image"
          placeholder="Image"
          className=" w-full file-input"
        />
        {/*  Country, City, World Rank, Subject Category, Scholarship Category, Degree, Tuition Fees  */}
        <input
          name="Country"
          placeholder="Country"
          className="input input-bordered w-full"
        />
        <input
          name="City"
          placeholder="City"
          className="input input-bordered w-full"
        />
        <input
          name="World Rank"
          placeholder="World Rank"
          className="input input-bordered w-full"
        />
        <input
          name="Subject Category"
          placeholder="Subject Category"
          className="input input-bordered w-full"
        />
        <input
          name="Scholarship Category"
          placeholder="Scholarship Category"
          className="input input-bordered w-full"
        />
        <input
          name="Degree"
          placeholder="Degree"
          className="input input-bordered w-full"
        />
        <input
          name="Tuition Fees"
          placeholder="Tuition Fees"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary w-full">Add Scholarship</button>
      </form>
    </div>
    );
};

export default AddScholarship;