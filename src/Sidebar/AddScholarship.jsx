const AddScholarship = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const scholarship = {
      scholarshipName: form.name.value,
      universityName: form.university.value,
      applicationFees: Number(form.fee.value),
      deadline: form.deadline.value,
    };

    fetch("http://localhost:5000/scholarship", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(scholarship),
    });

    form.reset();
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add Scholarship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          name="fee"
          placeholder="Application Fee"
          className="input input-bordered w-full"
        />
        <input
          type="date"
          name="deadline"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary w-full">Add Scholarship</button>
      </form>
    </div>
  );
};

export default AddScholarship;
