import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const { cartItem, food_list, removeToCart, currency, cartTotal, backendUrl } = useContext(StoreContext)
    const navigate = useNavigate()

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItem[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className='cart-title cart-items-item'>
                                    <img src={backendUrl + '/images/' + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>{currency}{item.price}</p>
                                    <p>{cartItem[item._id]}</p>
                                    <p>{currency}{item.price * cartItem[item._id]}</p>
                                    <p onClick={() => removeToCart(item._id)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                })}
            </div>

            <div className='cart-bottom'>
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
                            <p>{currency}{cartTotal() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{currency}{cartTotal() === 0 ? 0 : cartTotal() + 2}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have promo code , Enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
