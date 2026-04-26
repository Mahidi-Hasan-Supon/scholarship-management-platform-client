import React, { useRef } from "react";
import useAuth from "../useHook/useAuth";
import useRole from "../useHook/useRole";
import Loading from "../compunents/Loading/Loading";
import { imageUpload } from "../utils";
import useAxiosSecure from "../useHook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const editProfileModalRef = useRef();
  const { user , updateProfileFunc} = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();
  const { data: profile = [], isLoading  , refetch} = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/profile`);
      return res.data;
    },
  });
  console.log(profile);
  if(isLoading) return <Loading></Loading>
  if (isRoleLoading) return <Loading></Loading>;
  // console.log(role, isRoleLoading);
  if (!role) return <p>Role is no found</p>;
  // edit modal
  const handleEditModal = () => {
    editProfileModalRef.current.showModal();
  };
  const handleEditCloseModal = () => {
    editProfileModalRef.current.close();
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const imageFile =from.photo.files[0];
    console.log(imageFile);
    let imageUrl = profile?.photoURL;
    if(imageFile){
      imageUrl = await imageUpload(imageFile)
    }
    try{
    await  updateProfileFunc({
      displayName : name ,
      photoURL : imageUrl
      })
      const res = await axiosSecure.patch(`/update-profile`, {
        name,
        photo:imageUrl,
      });
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // user.displayName = name,
        // user.photoURL = image
        refetch()
        handleEditCloseModal();
      }
    
    }catch(err){
      console.log(err);
    }
  };
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
              <span className="font-medium">{role}</span>
            </div>

            {/* <div className="flex justify-between">
              <span className="text-gray-600">Joined:</span>
              <span className="font-medium">2026</span>
            </div> */}
          </div>

          {/* Button */}
          <div className="mt-6">
            <button
              onClick={handleEditModal}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog ref={editProfileModalRef} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Profile Update!</h3>
              <div>
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g:name"
                    className="input"
                    defaultValue={user?.name}
                  />
                  <input
                    type="file"
                    name="photo"
                    className="input my-2"
                  />

                  <div className="mt-3 flex justify-between">
                    <button type="submit" className="btn">
                      Update Profile
                    </button>
                    <button
                      type="button"
                      onClick={handleEditCloseModal}
                      className="btn"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>

              {/* if there is a button in form, it will close the modal */}
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
