import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verified = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const { backendUrl } = useContext(StoreContext)
    // console.log(success);
    // console.log(orderId);
    const navigate = useNavigate()
    const verifyPayment = async () => {
        const response = await axios.post(backendUrl + '/api/order/verify', { success, orderId });
        if (response.data.success) {
            navigate('/myorders')
        }
        else {
            navigate('/')
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verified
