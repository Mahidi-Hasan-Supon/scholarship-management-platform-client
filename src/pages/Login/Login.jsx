import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../useHook/useAuth";
import SocialLinks from "../../compunents/SocialLinks/SocialLinks";
import { saveOrUploadUser } from "../../utils";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate() 
  const location = useLocation()
  const { signInWithEmailAndPasswordFunc } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    // console.log(data);
    signInWithEmailAndPasswordFunc(data.email, data.password)
      .then(async (res) => {
        // console.log(res.user);
        await saveOrUploadUser({
          name:res.user?.name,
          email:res.user?.email,
          photo:res.data?.photoURL
        })
        navigate('/')
        navigate(location.state?location?.state : '/')
      })
      .catch((err) => {
        // console.log(err);
        // toast.error('Error')
         toast.error(err.message)
      });
  };
  return (
    <div className="py-20">
      <div className="card mx-auto py-10 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="card-body">
            <fieldset className="fieldset">
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
                  //   pattern:
                  //     /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              <button className="btn btn-neutral mt-4">Student Login</button>
              <div className="flex items-center ">
                <p className="border-t border-gray-200"></p>
                <p className="ml-15">Or</p>
                <p className="border-t border-gray-200"></p>
              </div>
              <div className="w-full">
                <SocialLinks></SocialLinks>
              </div>
              <p>
                You are new this website?Please{" "}
                <Link className="text-red-500" to="/register">
                  Register
                </Link>
              </p>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
