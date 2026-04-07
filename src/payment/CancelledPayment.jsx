import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import Loading from "../compunents/Loading/Loading";
import useAuth from "../useHook/useAuth";

const CancelledPayment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  // console.log(id);
  const [searchParams] = useSearchParams();
    const [paymentData, setPaymentData] = useState();

  const scholarshipId = searchParams.get("scholarshipId");
  // const scholarshipName = searchParams.get("scholarshipName");
  // console.log(scholarshipId);
  // console.log(scholarshipName);
  useEffect(() => {
   if(user?.email && scholarshipId){
     axios.post(`${import.meta.env.VITE_SERVER_SITE}/canceled-payment`, {
      studentEmail: user?.email,
      studentName: user?.displayName,
      // scholarshipName,
      scholarshipId,
    })
    .then((res) => {
      console.log(res.data);
          setPaymentData(res.data);
        });
   }
  }, [ user?.email,user?.displayName, scholarshipId]);
  //   if(Loading) return <Loading></Loading>
  // console.log(paymentData?.scholarshipName);
  return (
    <div className="flex justify-center items-center my-10 text-center ">
      <div className=" bg-green-400 shadow-2xl rounded-4xl h-[300px] w-[350px] text-white">
        {/* <h3 className='text-amber-200'>Canceled Payment.Please try again</h3>
          <Link to={`/cardDetails/${id}`}>
          <button className='btn btn-primary'>Try again</button>
          </Link> */}
        <h2 className="mb-2 text-center text-3xl font-semibold text-amber-50 mb-5 mt-10 ">
          ❌ Payment Failed
        </h2>
        <p className="my-2">ScholarshipName: {paymentData?.scholarshipName}</p>
        <p className="my-2 text-xl font-sans">Please try again.</p>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard/my-applications")}
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CancelledPayment;
