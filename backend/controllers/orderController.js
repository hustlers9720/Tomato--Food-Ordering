import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:5173';

    try {
        const { userId, items, amount, address } = req.body;

        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Ensuring correct amount without extra multiplication
            },
            quantity: item.quantity, // Fixing quantity error
        }));

        if (amount > 0) {
            line_items.push({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: "Delivery Charges",
                    },
                    unit_amount: 200, // Delivery fee in paisa (2 INR)
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ success: false, message: 'Error processing payment' });
    }
};

const verifyOrder = async (req, res) => {
    try {
        const { orderId, success } = req.body;

        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, messgae: "paid" })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, messgae: "Not paid" })
        }
    } catch (error) {
        console.log("Order Verification Error:", error);
        res.json({ success: false, message: "Error verifying order" });
    }
};



const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}


// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// api for update order status
const updateOrders = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrders };
