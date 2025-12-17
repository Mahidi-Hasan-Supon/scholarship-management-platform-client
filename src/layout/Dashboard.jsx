
import { NavLink, Outlet } from "react-router";
import useAuth from "../useHook/useAuth";


const DashboardLayout = () => {
  const { role } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <nav className="space-y-3 flex flex-col">
          <NavLink to="/dashboard">My Profile</NavLink>

          {role === "moderator" && (
            <>
              <NavLink to="/dashboard/applications">
                Manage Applications
              </NavLink>
              <NavLink to="/dashboard/reviews">
                All Reviews
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
