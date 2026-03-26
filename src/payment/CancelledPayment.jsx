import React from 'react';
import { Link, useParams } from 'react-router';

const CancelledPayment = () => {
    const {id} = useParams()
    console.log(id);
    return (
        <div>
           <h3 className='text-amber-200'>Canceled Payment.Please try again</h3>
          <Link to={`/cardDetails/${id}`}>
          <button className='btn btn-primary'>Try again</button>
          </Link>
        </div>
    );
};

export default CancelledPayment;