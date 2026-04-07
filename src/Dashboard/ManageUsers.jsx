import React from "react";
import useAuth from "../useHook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { data } from "react-router";
import Loading from "../compunents/Loading/Loading";
import useAxiosSecure from "../useHook/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure= useAxiosSecure()
    const {user} = useAuth() 
    const {data:users=[] , isLoading} = useQuery({
        queryKey:['users' , user?.email],
        queryFn:async ()=>{
            const result = await axiosSecure(`/users`,
            )
            return result.data
        }
    })
    // console.log(users);
    if(isLoading)return <Loading></Loading>
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
               
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

          {users.map((user)=>(

            <tr key={user?._id}>
              <th>
               
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img 
                        src={user?.photo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
               {user?.name}
              </td>
              <td>{user?.email}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
           
          </tbody>
        
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
