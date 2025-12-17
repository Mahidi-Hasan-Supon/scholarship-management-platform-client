import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../useHook/useAuth";

const Navbar = () => {
  const { user, signOutFunc } = useAuth();
  const [open, setOpen] = useState(false);
  const handleSignOut = () => {
    signOutFunc()
      .then(() => {
        console.log("signout");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const links = (
    <>
      <div className="flex">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/allScholarship">All Scholarships</NavLink>
        </li>
      </div>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <img
              src={user.photoURL}
              tabIndex={0}
              role="button"
              className="w-[40px] h-[40px] rounded-2xl"
              alt=""
            />
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
            
           <button onClick={handleSignOut} className="btn btn-secondary">
           SignOut
          </button >
            </ul>
          </div>
        ) : (
          <>
            <div className="gap-2">
              <Link to="/register" className="btn">
                Register
              </Link>
              <Link to="/login" className="btn mx-2">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
