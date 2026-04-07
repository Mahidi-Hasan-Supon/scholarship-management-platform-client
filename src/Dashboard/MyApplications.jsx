import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../compunents/Loading/Loading";
import useAuth from "../useHook/useAuth";
import useAxiosSecure from "../useHook/useAxiosSecure";

const MyApplications = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const {data:applications=[] , isLoading}=useQuery({
    queryKey:['applications' ,user?.email],
    queryFn:async()=>{
      const result = await axiosSecure.get(`/my-applications/${user?.email}`)
      return result.data 
    }
  })
  console.log(applications);
  if(isLoading) return <Loading></Loading>

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>

              <th>No</th>
              <th>University Name</th>
              <th>University Address</th>
              <th>Feedback</th>
              <th>Subject Category</th>
              <th>Application Fees</th>
              <th>Application Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              applications.map((application ,index)=>(

            <tr key={application._id}>
              <th>{index + 1}</th>
              <td>{application.universityName}</td>
              <td>{application.universityCity} & {application.universityCountry}</td>
              <td>{application.feedback?application.feedback : 'No feedback by moderator'}</td>
              <td>{application.subjectCategory}</td>
              <td>{application.amount}</td>
              <td>{application.applicationStatus}</td>
            </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
