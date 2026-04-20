import React from "react";
import useAuth from "../useHook/useAuth";
import useRole from "../useHook/useRole";
import Loading from "../compunents/Loading/Loading";

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  console.log(role, isRoleLoading);
  if (isRoleLoading) return <Loading></Loading>;
  if (!role) return <p>Role is no found</p>;
  return (
    <div>
      {/* <div className="border border-amber-200 h-[500px] w-[400px] md:w-[800px] mx-auto mt-10 rounded-3xl">
        <div>
            <h3 className="text-center ">Profile</h3>
        </div>
    </div> */}
      <div className="flex justify-center items-center min-h-screen bg-[#23BE0A20] p-4">
        <div className="bg-green-400 shadow-xl rounded-2xl p-6 w-full max-w-lg">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={user?.photoURL}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500"
            />
            <h2 className="text-xl font-semibold mt-4">{user?.displayName}</h2>
            {/* <p className="text-gray-500">Web Developer</p> */}
          </div>

          {/* Info Section */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-black">Email:</span>
              <span className="font-medium">{user?.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-black">Role:</span>
              <span className="font-medium">{role?.role}</span>
            </div>

            {/* <div className="flex justify-between">
              <span className="text-gray-600">Joined:</span>
              <span className="font-medium">2026</span>
            </div> */}
          </div>

          {/* Button */}
          <div className="mt-6">
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
