import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../useHook/useAuth";
import { GoPerson, GoPersonFill } from "react-icons/go";
import {
  FaCalendarPlus,
  FaClipboardCheck,
  FaFileAlt,
  FaStar,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import { RiUserStarFill } from "react-icons/ri";
import { PlusCircle, Users, UserStar } from "lucide-react";
import useRole from "../useHook/useRole";
const DashboardLayout = () => {
  const [role] = useRole();
  return (
    <div className="drawer lg:drawer-open bg-[#23BE0A60]">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle bg-[#23BE0A60]"
      />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-amber-400/20">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square bg-amber-300 btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4 "
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 ">Dashboard</div>
          <div>
          </div>
        </nav>
        {/* Page content here */}
        {/* dashboard route ta design */}
        <div className="flex justify-center items-center">
          This is dashboard page you can click sidebar menu and see this page
        </div>
        <Outlet></Outlet>
      </div>

      <div className="drawer-side mt-15 md:mt-0 is-drawer-close:overflow-visible bg-[#23BE0A60]">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <div>

        </div>
        <div className="flex min-h-full flex-col items-start  is-drawer-close:w-14 is-drawer-open:w-64 ">
          {/* Sidebar content here */}
          <ul className="menu w-full  grow">
            {/* home item */}
            <li>
              <Link to="/">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden ml-5">Homepage</span>
                </button>
              </Link>
            </li>
            {/* Add scholarship */}
            {role === "admin" && (
              <li>
                <Link to="/dashboard/add-scholarship">
                  <button
                    className="is-drawer-close:tooltip  is-drawer-close:tooltip-right"
                    data-tip="Add-Scholarship"
                  >
                    {/* Home icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-6"
                    >
                      <FaCalendarPlus></FaCalendarPlus>
                      {/* <PlusCircle></PlusCircle> */}
                    </svg>
                    <span className="is-drawer-close:hidden ml-5">
                      {" "}
                      Add Scholarship
                    </span>
                  </button>
                </Link>
              </li>
            )}
            {/* ManageUsers */}
            <li>
              <Link to="/dashboard/manage-users">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage-Users"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-6"
                  >
                    <FaUsers></FaUsers>
                  </svg>
                  <span className="is-drawer-close:hidden ml-5">
                    Manage Users
                  </span>
                </button>
              </Link>
            </li>
            {/* my application */}
            <li>
              <Link to="/dashboard/my-applications">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My-Applications"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-6"
                  >
                    <FaFileAlt></FaFileAlt>
                  </svg>
                  <span className="is-drawer-close:hidden ml-5">
                    My Applications
                  </span>
                </button>
              </Link>
            </li>
            {/* manage application */}
            <li>
              <Link to="/dashboard/manage-scholarship">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage-Scholarship"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-6"
                  >
                    <FaTasks></FaTasks>
                  </svg>
                  <span className="is-drawer-close:hidden ml-5">
                    Manage Scholarship
                  </span>
                </button>
              </Link>
            </li>
            {/* manage applied application */}
            <li>
              <Link to="/dashboard/Manage-applied-applications">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex"
                  data-tip="ManageAppliedApplications"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-6"
                  >
                    <FaClipboardCheck></FaClipboardCheck>
                  </svg>
                  <span className="is-drawer-close:hidden ml-5">
                    Manage Applied <br /> Applications
                  </span>
                </button>
              </Link>
            </li>
            {/* all reviews */}
            <li>
              <Link to="/dashboard/all-reviews">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="AllReviews"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-6"
                  >
                    <FaStar></FaStar>
                  </svg>
                  <span className="is-drawer-close:hidden ml-5">
                    All Reviews
                  </span>
                </button>
              </Link>
            </li>
            {/* my reviews */}
            <li>
              <Link to="/dashboard/my-reviews">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex"
                  data-tip="My-Reviews"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-0"
                  ></svg>
                  <RiUserStarFill></RiUserStarFill>
                  <span className="is-drawer-close:hidden ml-6">
                    My Reviews
                  </span>
                </button>
              </Link>
            </li>
            {/* profile */}
            <li>
              <Link to="/dashboard/profile">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-6"
                  >
                    <GoPersonFill></GoPersonFill>
                  </svg>
                  <span className="is-drawer-close:hidden ml-5">Profile</span>
                </button>
              </Link>
            </li>

            {/* setting item */}
            {/* <li className="my-20">
              <Link to='/'>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                >
                  Settings icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden ml-5"><GoPerson></GoPerson> Profile</span>
                </button>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
