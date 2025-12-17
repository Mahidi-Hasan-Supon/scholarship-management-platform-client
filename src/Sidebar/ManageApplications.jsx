import { useEffect, useState } from "react";

const ManageApplications = () => {
  const [apps, setApps] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/applications")
      .then((res) => res.json())
      .then((data) => setApps(data));
  }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:5000/applications/status/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(() => {
      setApps(apps.map((a) => (a._id === id ? { ...a, status } : a)));
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app._id}>
                <td>{app.applicantName}</td>
                <td>{app.userEmail}</td>
                <td>{app.status}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => setSelected(app)}
                    className="btn btn-xs"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, "processing")}
                    className="btn btn-xs btn-warning"
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, "completed")}
                    className="btn btn-xs btn-success"
                  >
                    Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-2">Application Details</h3>
            <p>Email: {selected.userEmail}</p>
            <p>Status: {selected.status}</p>
            <button className="btn mt-4" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageApplications;
