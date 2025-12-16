import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../useHook/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLinks from "../../compunents/SocialLinks/SocialLinks";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate()
  const { user, createUserWithEmailAndPasswordFunc , updateProfileFunc } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    const profileImg = data.photo[0];
  console.log(profileImg);
    createUserWithEmailAndPasswordFunc(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        const fromData = new FormData();
        fromData.append("image", profileImg);
        const image_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`
        axios.post(image_url , fromData)
       .then(res=>{
          const photoUrl = res.data.data.url;
          // update profile
          const userProfile = {
            email : data.email,
            displayName: data.name,
             photoURL: photoUrl
          }
          updateProfileFunc(userProfile)
          .then(()=>{
            console.log('profile picture done')
            navigate(location?.state || '/')
          })
          .catch(error => console.log(error))
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="py-20">
      <div className="card mx-auto py-10 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Name"
              />
              <label className="label">PhotoURL</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                placeholder="PhotoURL"
              />
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must be at least 6 characters long, contain one
                  uppercase letter and one special character.
                </p>
              )}
              <button className="btn btn-neutral mt-4">Student Register</button>
              <div className="flex items-center mx-3">
                <p className="border-t border-gray-200"></p>
                <p className="ml-15">Or</p>
                <p className="border-t border-gray-200"></p>
              </div>
              <p className="flex items-center justify-center w-full">
                <SocialLinks></SocialLinks>
              </p>
              <p>
                Already have an account?Please{" "}
                <Link className="text-red-500" to="/login">
                  Login
                </Link>
              </p>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
