import React, { useContext, useEffect, useState } from 'react'
import './Myorder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Myorder = () => {
    const { backendUrl, token, currency } = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrder = async () => {
        const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrder();
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My orders</h2>
            <div className='container'>
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index == order.items.length - 1) {
                                    return item.name + "x" + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + ","

                                }
                            })}</p>
                            <p>
                                {currency}{order.amount}.00
                            </p>
                            <p>Items : {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrder}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Myorder
