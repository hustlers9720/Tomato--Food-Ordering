import userModel from "../models/userModels.js";

// add item to user cart
const addTOCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // ✅ Initialize cartData if null/undefined

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: 'Added to Cart' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error adding to cart' });
    }
};




// remove items from the cart 
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: 'Removed from Cart' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}

// fetch user cart data
const getUserCartData = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
export { addTOCart, removeFromCart, getUserCartData }