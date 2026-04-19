import React, { useState } from "react";
import useAuth from "../useHook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { data } from "react-router";
import Loading from "../compunents/Loading/Loading";
import useAxiosSecure from "../useHook/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: userName } = useAuth();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", userName?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/users`);
      return result.data;
    },
  });
  // console.log(users);
  if (isLoading) return <Loading></Loading>;
  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/manage-user/${id}`).then((res) => {
          // console.log(res);
          refetch();
          if (res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };
  const handleUpdateRole = async (email, role) => {
    // console.log(email, role);
    const res = await axiosSecure.patch(`/update-role`, {
      email,
      role,
    });
    // console.log(res.data);
    if (res.data) {
      refetch();
      toast.success("Role updated");
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {users.map((user) => (
              <tr key={user?._id}>
                <th></th>
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
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <th>
                  <select
                    className="select select-primary"
                    value={user?.role}
                    onChange={(e) => {
                      handleUpdateRole(user?.email, e.target.value);
                    }}
                  >
                    <option disabled={true}>Select Role</option>
                    <option value="student">Student</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(user?._id)}
                    className="btn btn-secondary"
                  >
                    Delete
                  </button>
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
