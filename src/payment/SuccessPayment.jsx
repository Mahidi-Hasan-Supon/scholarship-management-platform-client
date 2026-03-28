import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import Loading from "../compunents/Loading/Loading";

const SuccessPayment = () => {
    const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentData, setPaymentData] = useState();
//   console.log(sessionId);
//   console.log('paymentData' , payment);
  useEffect(() => {
    if (sessionId) {
      axios
        .post(`${import.meta.env.VITE_SERVER_SITE}/success-payment`, {
          sessionId,
        })
        .then((res) => {
          setPaymentData(res.data.data);
        });
    }
  }, [sessionId]);
  if (!paymentData) return <Loading></Loading>;
  return (
    <div className="flex justify-center items-center my-10 text-center ">
      <div className=" bg-green-400 shadow-2xl rounded-4xl h-[350px] w-[350px]">
        <h1 className="mb-2 text-center text-3xl font-semibold text-amber-50 mb-5 mt-10 ">Payment-Success</h1>
        <p className="text-white mb-2">ScholarshipName: <span className="text-xl font-semibold">{paymentData?.scholarshipName}</span></p>
        <p className="text-white mb-2">UniversityName: <span className="text-xl font-semibold">{paymentData?.universityName}</span> </p>
        <p className="text-white mb-2">Amount Paid: <span className="text-xl font-semibold">${paymentData?.amount}</span> </p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/dashboard/my-applications")}
        >
          Go to My Applications
        </button>
      </div>
    </div>
  );
};

export default SuccessPayment;
