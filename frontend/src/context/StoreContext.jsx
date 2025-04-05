import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const currency = '$'
    const [cartItem, setCartItem] = useState({});
    // const backendUrl = 'http://localhost:3000'
    const backendUrl = 'https://tomato-food-ordering.onrender.com/'
    const [token, setToken] = useState('')
    const [food_list, setFoodList] = useState([])
    // console.log(token);

    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(backendUrl + '/api/cart/add', { itemId }, { headers: { token } })
        }
    }

    const removeToCart = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(backendUrl + '/api/cart/remove', { itemId }, { headers: { token } })
        }
    }

    const cartTotal = () => {
        let totalAmount = 0;
        for (const item in cartItem) {

            if (cartItem[item] > 0) {

                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item]
            }
        }

        return totalAmount;
    }


    const fetchFoodList = async () => {
        const response = await axios.get(backendUrl + '/api/food/list')
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.get(backendUrl + '/api/cart/get', { headers: { token } })
        setCartItem(response.data.cartData)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'))
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list, currency,
        cartItem, setCartItem,
        addToCart, removeToCart,
        cartTotal,
        backendUrl,
        token, setToken
    }



    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider