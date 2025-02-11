import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + '/api/order/list');
            if (response.data.success) {
                setOrders(response.data.data);
            } else {
                toast.error('Error fetching orders');
            }
        } catch (error) {
            toast.error('Server error');
        }
    };

    const handleStatusChange = async (e, orderId) => {
        try {
            const response = await axios.post(url + '/api/order/status', { orderId, status: e.target.value });
            if (response.data.success) {
                toast.success('Order status updated successfully');
                await fetchAllOrders(); // Refresh orders after status update
            } else {
                toast.error('Failed to update order status');
            }
        } catch (error) {
            toast.error('Error updating status');
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='orders-container'>
            <h3>Admin Orders</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                        <div>
                            <p className='order-item-food'>
                                {order.items.map((item, i) => (
                                    <span key={i}>{item.name} x {item.quantity}{i !== order.items.length - 1 ? ', ' : ''}</span>
                                ))}
                            </p>
                            <p className='order-address'><b>Customer:</b> {order.address.firstname} {order.address.lastname}</p>
                            <p className='order-address'><b>Address:</b> {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}</p>
                            <p className='order-status'><b>Status:</b> {order.status}</p>
                            <p className='order-amount'><b>Amount:</b> ${order.amount}</p>
                            <select className='order-status-dropdown' value={order.status} onChange={(e) => handleStatusChange(e, order._id)}>
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out of Delivery">Out of Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
