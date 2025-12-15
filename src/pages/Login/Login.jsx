import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../useHook/useAuth";
import SocialLinks from "../../compunents/SocialLinks/SocialLinks";

const Login = () => {
    const {signInWithEmailAndPasswordFunc} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    console.log(data);
    signInWithEmailAndPasswordFunc(data.email , data.password)
    .then(res=>{
        console.log(res.user);
    })
    .catch(err=>{
        console.log(err);
    })
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
                <p className="flex items-center justify-center w-full">
               <SocialLinks></SocialLinks>
             </p>
               <p>You are new this website?Please  <Link className="text-red-500" to='/register'>Register</Link></p>
            </fieldset>
           
          </div>
            
        </form>
      </div>
    </div>
  );
};

export default Login;
