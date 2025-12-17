import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../useHook/useAuth";

const Sidebar = () => {
  const {user} = useAuth() // auth context থেকে আসবে
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/users/role/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setRole(data.role));
  }, [user]);

  return (
    <aside className="w-64 bg-indigo-700 text-white p-5 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {role === "admin" && (
        <>
          <Link
            className="block hover:bg-indigo-600 p-2 rounded"
            to="/dashboard/profile"
          >
            My Profile
          </Link>
          <Link
            className="block hover:bg-indigo-600 p-2 rounded"
            to="/dashboard/add-scholarship"
          >
            Add Scholarship
          </Link>
          <Link
            className="block hover:bg-indigo-600 p-2 rounded"
            to="/dashboard/manage-users"
          >
            Manage Users
          </Link>
          <Link
            className="block hover:bg-indigo-600 p-2 rounded"
            to="/dashboard/analytics"
          >
            Analytics
          </Link>
        </>
      )}

      {role === "moderator" && (
        <>
          <Link
            className="block hover:bg-indigo-600 p-2 rounded"
            to="/dashboard/profile"
          >
            My Profile
          </Link>
          <Link
            className="block hover:bg-indigo-600 p-2 rounded"
            to="/dashboard/manage-applications"
          >
            Applications
          </Link>
          <Link
            className="block hover:bg-indigo-600 p-2 rounded"
            to="/dashboard/reviews"
          >
            All Reviews
          </Link>
        </>
      )}

      {role === "student" && (
        <>
          <Link
            className="block hover:bg-indigo-600 p-2 rounded"
            to="/dashboard/profile"
          >
            My Profile
          </Link>
          <Link
            className="block hover:bg-indigo-600 p-2 rounded"
            to="/dashboard/my-applications"
          >
            My Applications
          </Link>
          <Link
            className="block hover:bg-indigo-600 p-2 rounded"
            to="/dashboard/my-reviews"
          >
            My Reviews
          </Link>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
