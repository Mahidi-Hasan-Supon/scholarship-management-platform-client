import React from "react";
import useAuth from "../useHook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { data } from "react-router";
import Loading from "../compunents/Loading/Loading";

const ManageUsers = () => {
    const {user} = useAuth() 
    const {data:users=[] , isLoading} = useQuery({
        queryKey:['users' , user?.email],
        queryFn:async ()=>{
            const result = await axios(`${import.meta.env.VITE_SERVER_SITE}/users/role/${user?.email}`,
            )
            return result.data
        }
    })
    console.log(users);
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
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}


            <tr key={user?._id}>
              <th>
               
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user?.photoURL}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user?.name}</div>
                  </div>
                </div>
              </td>
              <td>
               {user?.email}
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
           
          </tbody>
        
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
