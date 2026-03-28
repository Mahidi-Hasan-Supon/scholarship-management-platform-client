import React from "react";
import { Link, Navigate, useParams } from "react-router";

const CancelledPayment = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      {/* <h3 className='text-amber-200'>Canceled Payment.Please try again</h3>
          <Link to={`/cardDetails/${id}`}>
          <button className='btn btn-primary'>Try again</button>
          </Link> */}
      <h2>❌ Payment Failed</h2>
      <p>Scholarship: {name}</p>
      <p>Please try again.</p>

      <button onClick={() => Navigate("/dashboard")}>
        Return to Dashboard
      </button>
    </div>
  );
};

export default CancelledPayment;
