import { useEffect, useState } from "react";
import useAuth from "../useHook/useAuth";

const MyApplications = () => {
  const {user} = useAuth;
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/applications/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setApps(data));
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>University</th>
            <th>Status</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr key={app._id}>
              <td>{app.universityName}</td>
              <td>{app.status}</td>
              <td>{app.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
