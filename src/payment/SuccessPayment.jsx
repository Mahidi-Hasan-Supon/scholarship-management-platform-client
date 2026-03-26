import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';

const SuccessPayment = () => {
    const [searchParams , setSearchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    console.log(sessionId);
    useEffect(()=>{
        if(sessionId){
            axios.patch(`${import.meta.env.VITE_SERVER_SITE}/success-payment`,{sessionId})
        }
    },[sessionId])
  
    return (
        <div>
            <h2>Success payment</h2>
        </div>
    );
};

export default SuccessPayment;