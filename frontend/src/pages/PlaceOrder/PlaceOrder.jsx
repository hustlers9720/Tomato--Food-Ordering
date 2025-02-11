import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
    const { cartTotal, currency, token, food_list, cartItem, backendUrl } = useContext(StoreContext);

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        let order_item = food_list
            .filter((item) => cartItem[item._id] > 0)
            .map((item) => ({
                ...item,
                quantity: cartItem[item._id] // Ensuring lowercase 'quantity' as required by Stripe
            }));

        let orderData = {
            address: data,
            items: order_item,
            amount: cartTotal() + (cartTotal() > 0 ? 2 : 0),
            userId: "USER_ID_HERE", // Make sure to pass the userId from context or props
        };

        try {
            let response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
            if (response.data.success) {
                window.location.replace(response.data.session_url);
            } else {
                alert("Error placing order");
            }
        } catch (error) {
            console.error("Order placement error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/cart')
        }
        else if (cartTotal() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-fields">
                    <input name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First Name' required />
                    <input name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last Name' required />
                </div>
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' required />
                <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
                <div className="multi-fields">
                    <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
                    <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
                </div>
                <div className="multi-fields">
                    <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zipcode' required />
                    <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
                </div>
                <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{currency}{cartTotal()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{currency}{cartTotal() > 0 ? 2 : 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{currency}{cartTotal() > 0 ? cartTotal() + 2 : 0}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
